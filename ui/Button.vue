<template>
  <button
    class="disabled:bg-melrose relative h-12 w-full rounded-xl bg-malibu font-medium text-black-pearl transition-all hover:bg-cornflower-blue hover:shadow-xl hover:shadow-cornflower-blue/25 disabled:cursor-default disabled:hover:shadow-none"
    :disabled="loading"
  >
    <slot v-if="!loading" />

    <span
      v-else
      class="loading-animate mx-auto block h-5 w-5 rounded-2xl border-4 border-white/20 border-r-malibu"
    />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ loading?: boolean }>()
</script>

<style lang="scss" scoped>
.loading-animate {
  animation: spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
