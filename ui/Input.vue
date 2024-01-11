<template>
  <div class="w-full">
    <div class="relative">
      <div
        class="relative flex h-12 w-full items-center gap-2.5 rounded-xl border border-mischka px-3 dark:border-woodsmoke"
      >
        <slot name="icon" />

        <div
          v-if="isPlaceholder"
          class="absolute -top-1.5 left-2 bg-athens-gray px-1 text-xs opacity-70 transition-all dark:bg-cod-gray"
        >
          {{ placeholder }}
        </div>

        <input
          class="w-full min-w-0 !appearance-none bg-transparent text-base outline-none read-only:cursor-default"
          :placeholder="placeholder"
          :type="type ?? 'text'"
          :value="modelValue"
          :readonly="readonly"
          @input="updateValue"
        />

        <slot name="trailing" />
      </div>

      <slot name="bottom" />
    </div>

    <ul v-if="errors?.length" class="mt-2">
      <li
        v-for="(item, index) in errors"
        :key="index"
        class="mt-1 text-xs font-light text-[#FF3F57]"
      >
        {{ typeof item === 'object' ? $t(item.$message) : $t(item) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string | number | null
  placeholder: string
  type?: string
  errors?: string[] | any[]
  readonly?: boolean
}>()

const isPlaceholder = computed(() =>
  props.modelValue !== null ? String(props.modelValue ?? '').length : false,
)

function updateValue(event: any) {
  emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: textfield !important;
}
</style>
