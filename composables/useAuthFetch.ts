export const useAuthFetch = () => {
  const navigate = useNavigateStore()
  const language = useLanguageStore()

  async function fetchData() {
    await Promise.all([navigate.fetch(), language.fetch()])
  }

  return { fetchData }
}
