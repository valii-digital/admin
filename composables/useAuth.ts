import Cookies from 'js-cookie'

export const useAuth = () => {
  const router = useRouter()
  const route = useRoute()
  const preloader = usePreloaderStore()
  const user = useUserStore()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const { fetchData } = useAuthFetch()

  const refreshIntervalToken = ref<any>(null)
  const refreshIntervalUser = ref<any>(null)

  async function init() {
    const isAuth = route.path === localePath('/auth')
    const token = getToken()

    if (token) {
      await refresh()

      refreshIntervalUser.value = setInterval(async () => {
        await fetchUser()
      }, 300000)

      if (isAuth) return router.push(localePath('/'))
    } else {
      if (!isAuth)
        router.push({
          path: localePath('/auth'),
          query: { redirect: route.fullPath },
        })

      router.push({
        path: localePath('/auth'),
        query: { ...route.query },
      })

      setTimeout(() => {
        preloader.data = false
      }, 500)
    }
  }

  async function login(token: string) {
    preloader.data = true

    await setToken(token)
    await fetchUser()
  }

  async function refresh() {
    const now = new Date()
    const max = new Date(Cookies.get('max_age'))

    if (now > max)
      await useApi('auth/refresh')
        .then(async ({ data: { value } }) => {
          if (value.success) {
            await setToken(value.access_token)
            await fetchUser()
          }
        })
        .catch(() => logout())
    else await fetchUser()
  }

  async function logout(noRedirect = false) {
    preloader.data = true
    clearInterval(refreshIntervalToken.value)
    clearInterval(refreshIntervalUser.value)

    const token = getToken()
    const isAuth = route.path === localePath('/auth')

    try {
      if (token) removeToken()
      // await useApi('auth/logout', { method: 'POST' }).then(() =>
      //   removeToken(),
      // )

      if (!isAuth)
        return router.push({
          path: localePath('/auth'),
          query: noRedirect ? {} : { redirect: route.fullPath },
        })
    } finally {
      preloader.data = false
    }
  }

  async function fetchUser() {
    await useApi('auth/me')
      .then(async ({ data: { value } }) => {
        router.push(switchLocalePath(value.language))
        user.data = value.data

        await fetchData()
      })
      .catch(() => logout())
      .finally(() => {
        preloader.data = false

        if (user.isAuth && route.path === localePath('/auth')) {
          if (route.query.redirect)
            return router.push(route.query.redirect as string)
          return router.push(localePath('/'))
        }
      })
  }

  function getToken() {
    const cookieToken = Cookies.get('accessToken')

    if (cookieToken) user.token = cookieToken
    return cookieToken
  }

  async function setToken(options: any) {
    const now = new Date()
    const maxAge: any = now
    const expires: any = now

    maxAge.setDate(now.getDate() + 3)
    expires.setDate(now.getDate() + 7)

    user.token = options

    Cookies.set('maxAge', maxAge, {
      expires,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })
    Cookies.set('accessToken', options, {
      expires,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })

    return options
  }

  function removeToken() {
    Cookies.remove('accessToken')
    Cookies.remove('maxAge')

    user.data = null
    user.token = null
  }

  return {
    init,
    login,
    logout,
    refresh,
    setToken,
    removeToken,
    getToken,
  }
}
