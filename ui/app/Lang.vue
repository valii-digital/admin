<template>
  <OnClickOutside class="relative" @trigger="closeList()">
    <div
      class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-mischka bg-athens-gray text-sm font-medium uppercase dark:border-woodsmoke dark:bg-cod-gray"
      @click="isListOpen = !isListOpen"
    >
      <!-- <Icon
        name="prime:language"
        class="mx-auto h-4 w-4 text-black-pearl dark:text-white"
      /> -->

      {{ locale }}
    </div>

    <Transition name="fade">
      <div
        v-if="isListOpen"
        class="absolute top-full mt-1 grid w-9 gap-1 rounded-lg border border-mischka bg-athens-gray p-1 dark:border-woodsmoke dark:bg-cod-gray"
      >
        <NuxtLink
          v-for="item in locales"
          :to="switchLocalePath(item.lang)"
          :class="[
            'flex aspect-square w-full cursor-pointer items-center justify-center rounded border border-transparent text-xs font-medium uppercase transition-colors hover:border-mischka hover:border-woodsmoke',
            {
              '!cursor-default !border-transparent bg-cornflower-blue !text-black-pearl':
                locale === item.lang,
            },
          ]"
          @click="locale = item.lang"
        >
          {{ item.lang }}
        </NuxtLink>
      </div>
    </Transition>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isListOpen = ref(false)

function closeList() {
  isListOpen.value = false
}

watch(
  () => locale.value,
  () => closeList(),
)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
