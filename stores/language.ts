export const useLanguageStore = defineStore('language', () => {
  interface LanguageElement {
    key: number | string
  }

  const select = ref<string>('en')
  const data = ref<LanguageElement[] | {}>({})

  const keys = computed(() => Object.keys(data.value))

  async function fetch() {
    data.value = (await useApi('/public/languages')).data?.value?.data ?? {}
    if (data.value) select.value = 'uk'
  }

  return { data, select, keys, fetch }
})
