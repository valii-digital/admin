<template>
  <div class="relative -z-0 grid gap-10 p-8">
    <TransitionGroup name="fade">
      <template v-if="!loading">
        <slot name="navigate" />

        <div class="flex items-center text-5xl font-bold tracking-wider">
          <slot name="top" />
        </div>

        <slot name="content" />

        <slot name="end" />
      </template>
    </TransitionGroup>

    <Transition name="fade">
      <div
        v-if="loading"
        class="absolute left-0 right-0 top-[40vh] h-full w-full"
      >
        <UAppLoader />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['save'])
defineProps<{ loading?: boolean }>()

const { Ctrl_S } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown') e.preventDefault()
  },
})

watch(Ctrl_S, (v) => {
  if (v) emit('save')
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
