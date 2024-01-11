<template>
  <UPage :loading="loading">
    <template #top>
      <div class="flex w-full items-center justify-between">
        {{ originalValue?.title ?? route.params.url }}

        <NuxtLink
          v-if="isAddAction && originalValue.data.length"
          :to="localePath(`/crud/${route.params.url}/add`)"
          class="flex h-9 items-center gap-1.5 rounded-lg border border-screamin-green px-6 text-base font-medium uppercase tracking-normal transition-all hover:bg-screamin-green hover:text-black-pearl"
        >
          Add

          <Icon name="gridicons:create" />
        </NuxtLink>
      </div>
    </template>

    <template #content>
      <div v-if="originalValue.data.length" class="">
        <UTable
          :data="originalValue.data"
          :fields="originalValue.fields"
          :actions="originalValue.actions"
          crud
          @update:data="originalValue.data = $event"
        />

        <UPaginations class="mt-7" :pages="pages" />
      </div>

      <UTableNotFound v-else>
        <UButton
          v-if="isAddAction"
          class="flex max-w-sm items-center justify-center gap-1.5"
          @click="router.push(localePath(`/crud/${route.params.url}/add`))"
        >
          Додати

          <Icon name="gridicons:create" />
        </UButton>
      </UTableNotFound>
    </template>
  </UPage>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const loading = ref(true)
const originalValue: any = ref({})

const isAddAction = computed(() => originalValue.actions?.indexOf('add') !== -1)
const pages = computed(() => Math.ceil(originalValue.value.count / 20))
const offset = computed(
  () => (route.query.page ? Number(route.query.page) : 1) * 20 - 20,
)

onMounted(() => {
  fetch()
})

async function fetch() {
  await useApi(`admin/${route.params.url}?limit=20&offset=${offset.value}`)
    .then(({ data: { value } }) => {
      originalValue.value = value
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => route.query.page,
  () => {
    fetch()
  },
)
</script>
