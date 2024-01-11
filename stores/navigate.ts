export const useNavigateStore = defineStore('navigate', () => {
  const data = ref([])

  async function fetch() {
    data.value = (await useApi('/admin/menu')).data?.value?.data ?? []
  }

  return { data, fetch }
})
