export const useApi: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig()
  const auth = useAuth()
  const { token } = useUserStore()
  const {
    $i18n: { locale },
  } = useNuxtApp()

  return useFetch(request, {
    baseURL: config.public.API_URL,

    headers: {
      'Accept-Language': 'uk', // locale.value,
      Authorization: token ? `Bearer ${token}` : null,
    },

    onRequest({ request, options }) {},
    async onRequestError({ request, options, error }) {
      console.log('Request error:', request, options, error)
    },

    onResponse({ request, response, options }) {},
    async onResponseError({ request, response, options }) {
      console.log('Response error:', request, options, response)

      if (response?.status === 401 || response?.status === 403) {
        auth.logout()
      }
    },

    ...opts,
  })
}
