export const useUserStore = defineStore('user', () => {
  const data: any = ref(null)
  const token: any = ref(null)

  const isAuth = computed(() => data.value && token.value)

  return { data, token, isAuth }
})
