<template>
  <UPage :loading="loading" @save="onSave">
    <template #navigate>
      <NuxtLink
        :to="localePath(`/crud/${route.params.url}`)"
        class="flex h-9 w-9 items-center rounded-lg border border-mischka transition-all hover:border-cornflower-blue dark:border-woodsmoke dark:hover:border-cornflower-blue"
        title="Назад"
      >
        <Icon class="mx-auto h-6 w-6" name="eva:arrow-back-fill" />
      </NuxtLink>
    </template>

    <template #top> Редагувати {{ getPageName }} </template>

    <template #content>
      <ULangSelect class="mb-5" :fields="fieldsValue" />

      <UForm
        class="max-w-4xl"
        v-model="clonedValue"
        :fields="fieldsValue"
        :errors="v$"
      />
    </template>

    <template #end>
      <div class="flex gap-2" v-auto-animate>
        <button
          class="flex h-10 items-center gap-1.5 rounded-lg border border-screamin-green px-6 font-medium hover:bg-screamin-green hover:text-black-pearl disabled:bg-transparent disabled:text-black-pearl disabled:opacity-70 dark:disabled:text-cararra"
          :title="'Зберегти & Ctrl+S'"
          :disabled="!isUpdateValue"
          @click="onSave"
        >
          Зберегти

          <Icon name="mingcute:save-2-line" />
        </button>

        <button
          v-if="isUpdateValue"
          class="flex h-10 items-center gap-1.5 rounded-lg border border-radical-red px-6 font-medium hover:bg-radical-red hover:text-black-pearl disabled:bg-transparent disabled:text-black-pearl disabled:opacity-70 dark:disabled:text-cararra"
          :title="'Відмінити'"
          @click="onClone"
        >
          Відмінити

          <Icon name="akar-icons:arrow-back" />
        </button>

        <button
          class="flex h-10 items-center gap-1.5 rounded-lg border border-radical-red px-6 font-medium hover:bg-radical-red hover:text-black-pearl"
          :title="'Видалити'"
          @click="onDelete"
        >
          Видалити

          <Icon name="mingcute:delete-line" />
        </button>
      </div>
    </template>
  </UPage>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const language = useLanguageStore()

const {
  loading,
  fieldsValue,
  originalValue,
  clonedValue,
  isUpdateValue,
  v$,
  onClone,
} = useCRUDPage()

const getPageName = computed(() => {
  if (originalValue.value.name) {
    if (typeof originalValue.value.name === 'object')
      return originalValue.value.name[language.select]
    return originalValue.value.name
  }

  return originalValue.value.id
})

onMounted(() => {
  fetchAll()
})

async function fetchAll() {
  await Promise.all([fetchField(), fetchValue()]).finally(() => {
    loading.value = false
  })
}

async function fetchField() {
  await useApi(`/admin/${route.params.url}/fields`).then(
    ({
      data: {
        value: { data },
      },
    }) => {
      fieldsValue.value = data
    },
  )
}

async function fetchValue() {
  await useApi(`/admin/${route.params.url}/${route.params.id}`).then(
    ({
      data: {
        value: { data },
      },
    }) => {
      originalValue.value = data
      onClone()
    },
  )
}

async function onSave() {
  if (!isUpdateValue) return

  v$.value.$touch()
  if (v$.value.$invalid) return

  await useApi(`/admin/${route.params.url}/${route.params.id}`, {
    method: 'POST',
    body: clonedValue.value,
  }).then(
    ({
      data: {
        value: { data },
      },
    }) => {
      originalValue.value = data
      onClone()
    },
  )
}

async function onDelete() {
  await useApi(`/admin/${route.params.url}/${route.params.id}`, {
    method: 'DELETE',
  }).then(() => {
    router.push(localePath(`/crud/${route.params.url}`))
  })
}
</script>
