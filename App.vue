<template>
  <template v-if="!preloader.data">
    <NuxtLayout v-if="layoutName === 'default'" name="default">
      <NuxtPage />
    </NuxtLayout>

    <NuxtPage v-else />
  </template>

  <UAppPreloader />
</template>

<script lang="ts" setup>
const { locale } = useI18n()
const preloader = usePreloaderStore()
const route = useRoute()
const localePath = useLocalePath()
const { init } = useAuth()

useHead({ htmlAttrs: { lang: locale } })

const layoutName = ref('auth')

onMounted(() => {
  init()
})

watch(
  () => route.path,
  async () => {
    return (layoutName.value =
      route.path === localePath('/auth') ? 'auth' : 'default')
  },
  { immediate: true },
)
</script>
