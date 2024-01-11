export default defineNuxtPlugin(() => {
  // const { $auth } = useNuxtApp()
  // $auth.init()
  console.log('initialized')

  return { provide: { init: {} } }
})
