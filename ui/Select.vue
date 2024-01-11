<template>
  <OnClickOutside @trigger="closeList()">
    <UInput
      :modelValue="previewValue"
      :placeholder="placeholder"
      :errors="errors"
      readonly
      @click="isListOpen = !isListOpen"
    >
      <template #icon>
        <slot name="icon" />
      </template>

      <template #trailing>
        <div
          :class="[
            'flex h-full cursor-pointer items-center transition-all',
            { '-rotate-180': isListOpen },
          ]"
        >
          <Icon class="mx-auto" name="ep:arrow-down" />
        </div>
      </template>

      <template #bottom>
        <Transition name="fade">
          <ul
            v-if="isListOpen"
            class="absolute top-full z-10 mt-2 max-h-36 w-full overflow-y-auto rounded-lg border border-mischka bg-athens-gray p-1.5 shadow-lg shadow-mischka/70 dark:border-woodsmoke dark:bg-cod-gray dark:shadow-woodsmoke/70"
          >
            <template v-if="isListArray">
              <li
                v-for="item in list"
                :key="item"
                class="relative flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-2 py-3 transition-all hover:border-mischka dark:hover:border-woodsmoke"
                @click="select(item)"
              >
                {{ item }}

                <Icon
                  v-if="isSelect(item)"
                  class="text-screamin-green opacity-80"
                  name="ph:check-bold"
                />
              </li>
            </template>

            <template v-else>
              <li
                v-for="(item, index) in list"
                :key="item"
                class="relative flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-2 py-3 transition-all hover:border-mischka dark:hover:border-woodsmoke"
                @click="select(index)"
              >
                {{ item }} {{ index }} {{ modelValue }}

                <Icon
                  v-if="isSelect(index)"
                  class="text-screamin-green opacity-80"
                  name="ph:check-bold"
                />
              </li>
            </template>
          </ul>
        </Transition>
      </template>
    </UInput>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string | number | string[] | number[] | null
  placeholder: string
  list: object | any[]
  errors?: string[] | any[]
  notClear?: boolean
}>()

const isListOpen = ref(false)

const isListArray = computed(() => props.list instanceof Array)

const previewValue = computed(() => {
  if (props.modelValue && props.list) {
    if (props.list instanceof Array) {
      const index = props.list.findIndex((e) => e === props.modelValue)
      return props.list[index]
    }

    return props.list[props.modelValue]
  }

  return ''
})

function closeList() {
  isListOpen.value = false
}

function select(value: string | number) {
  if (props.multiple) {
    let list: string[] | number[] = []
    list.concat(props.modelValue)

    const index = list.indexOf(value)

    if (index !== -1)
      return (list = list.splice(index, 1)), emit('update:modelValue', list)

    list.push(value)
    return emit('update:modelValue', value)
  }

  if (props.modelValue === value && !props.notClear)
    return emit('update:modelValue', '')
  return emit('update:modelValue', value)
}

function isSelect(value: string | number) {
  if (props.modelValue === null) return false
  return props.modelValue == value
}
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
