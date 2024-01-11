<template>
  <div v-if="visible" class="grid min-h-screen grid-cols-[270px_auto]">
    <UAppSidebar />

    <div class="border-l border-mischka dark:border-woodsmoke">
      <UAppHeader />

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const localePath = useLocalePath()
const user = useUserStore()
const preloader = usePreloaderStore()

const visible = ref(false)

watch(
  () => user,
  (newValue) => {
    if (!newValue.isAuth && !preloader.data) {
      router.push(localePath('/auth'))
    } else if (newValue.isAuth && !preloader.data) {
      visible.value = true
    }
  },
  { immediate: true, deep: true },
)
</script>
