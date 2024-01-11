<template>
  <UPage :loading="loading">
    <template #navigate>
      <NuxtLink
        :to="localePath(`/crud/${route.params.url}`)"
        class="flex h-9 w-9 items-center rounded-lg border border-mischka transition-all hover:border-cornflower-blue dark:border-woodsmoke dark:hover:border-cornflower-blue"
        title="Назад"
      >
        <Icon class="mx-auto h-6 w-6" name="eva:arrow-back-fill" />
      </NuxtLink>
    </template>

    <template #top> Додати </template>

    <template #content>
      <ULangSelect />

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
          @click="save"
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

onMounted(() => {
  fetch()
})

async function fetch() {
  await useApi(`/admin/${route.params.url}/fields`)
    .then(
      ({
        data: {
          value: { data },
        },
      }) => {
        createFields(data)
      },
    )
    .finally(() => {
      loading.value = false
    })
}

async function save() {
  if (!isUpdateValue) return

  v$.value.$touch()
  if (v$.value.$invalid) return

  await useApi(`/admin/${route.params.url}`, {
    method: 'POST',
    body: clonedValue.value,
  }).then(
    ({
      data: {
        value: { data },
      },
    }) => {
      originalValue.value = data
      router.push(localePath(`/crud/${route.params.url}/${data.id}`))
    },
  )
}

function createFields(data: any) {
  for (const field in data) {
    originalValue.value[field] = data[field]?.default
      ? data[field]?.default
      : null

    if (data[field]?.translations) {
      originalValue.value[field] = {}

      for (const lang in language.data) {
        if (field === 'text') originalValue.value[field][lang] = ' '
        else originalValue.value[field][lang] = null
      }
    }

    if (field === 'select-multiple') originalValue.value[field] = []
  }

  onClone()
  fieldsValue.value = data
}
</script>
