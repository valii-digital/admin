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
            class="pointer-events-auto absolute top-full z-10 mt-2 max-h-36 w-full overflow-y-auto rounded-lg border border-mischka bg-athens-gray p-1.5 shadow-lg shadow-mischka/70 dark:border-woodsmoke dark:bg-cod-gray dark:shadow-woodsmoke/70"
            @click.stop="isListOpen = true"
          >
            <li
              v-for="(item, index) in list"
              :key="index"
              class="group relative"
            >
              <input
                v-model="value"
                :id="`item-${index}`"
                class="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                type="checkbox"
                :value="index"
              />

              <label
                :for="`item-${index}`"
                class="flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-2 py-3 transition-all group-hover:border-mischka dark:group-hover:border-woodsmoke"
              >
                {{ item }}

                <Icon
                  v-if="isSelect(index)"
                  class="text-screamin-green opacity-80"
                  name="ph:check-bold"
                />
              </label>
            </li>
          </ul>
        </Transition>
      </template>
    </UInput>
  </OnClickOutside>

  {{ list[admin_users_view] }}
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string[] | number[] | []
  placeholder: string
  list: any
  errors?: string[] | any[]
  notClear?: boolean
}>()

const isListOpen = ref(false)

const previewValue = computed(() => {
  if (props.modelValue && props.list) {
    const selected = []

    for (const item in props.modelValue) {
      selected.push(
        props.list[item] ??
          props.list[props.modelValue[item]] ??
          `Not found! Item: ${props.modelValue[item]}`,
      )
    }

    return selected.join(', ')
  }

  return ''
})

const value = computed({
  get() {
    return props.modelValue ?? []
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

function closeList() {
  isListOpen.value = false
}

function isSelect(value: string | number) {
  if (props.modelValue === null) return false

  if (typeof props.modelValue === 'object')
    return props.modelValue.findIndex((e) => e === value) !== -1
  return props.modelValue === value
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
