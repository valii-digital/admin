<template>
  <div class="group relative flex flex-col justify-center">
    <input
      v-model="propsValue"
      class="absolute left-0 top-0 h-px w-px opacity-0"
      type="checkbox"
      id="boolean"
    />

    <label class="flex cursor-pointer items-center gap-2" for="boolean">
      <i
        class="relative flex h-7 w-7 items-center justify-center rounded-md border border-mischka transition-all group-hover:shadow-lg group-hover:shadow-screamin-green/20 dark:border-woodsmoke"
      />

      <template v-if="placeholder">
        {{ placeholder }}
      </template>

      <slot v-else />
    </label>
  </div>
</template>

<script setup lang="ts">
//! TODO: https://louismazel.github.io/maz-ui-3/components/maz-checkbox

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{ modelValue: boolean; placeholder?: string }>()

const propsValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
</script>

<style scoped lang="scss">
input:checked + label {
  i {
    @apply border-screamin-green;

    &:after {
      @apply opacity-100;
    }
  }
}

label {
  &:hover {
    i {
      @apply border-screamin-green;
    }
  }

  i {
    &:after {
      @apply absolute h-4 w-4 rounded bg-screamin-green opacity-0 transition-opacity content-[''];
    }
  }
}
</style>
