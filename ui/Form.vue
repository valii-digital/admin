<template>
  <div class="grid grid-cols-2 gap-5">
    <Component
      v-for="(field, index) in fields"
      v-bind="getAttribute(field, index)"
      v-on="getActions(field, index)"
      :key="index"
      :is="getComponent(field.type)"
      :modelValue="
        getEval(
          propsValue,
          field.translations ? `${index}?.${language.select}` : index,
        )
      "
      :errors="
        getEval(
          errors,
          field.translations
            ? `${index}?.${language.select}?.$errors`
            : `${index}?.$errors`,
        )
      "
      @update:modelValue="setValue($event, field, index)"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  fields: object
  modelValue: object
  errors: object
}>()

const language = useLanguageStore()

const propsValue: any = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

function getAttribute(field: any, key: string) {
  const attrs: any = {}

  if (field.type === 'number') attrs.type = 'number'
  if (field.type === 'select' || field.type === 'select-multiple')
    attrs.list = field.values
  if (field.type === 'image' || field.type === 'file')
    attrs['preview'] = props.modelValue[`${key}_url`]
  if (field.multiple) attrs.multiple = true
  attrs.placeholder = field.name ?? key
  attrs.style = {
    'grid-column':
      field.type === 'editor' || field.type === 'image' || field.type === 'file'
        ? 'span 2 / span 2'
        : 'span 1 / span 1',
  }

  return attrs
}

function getActions(field: any, key: string) {
  const attrs: any = {}

  if (field.type === 'image' || field.type === 'file') {
    attrs['update:preview'] = (newValue) =>
      (props.modelValue[`${key}_url`] = newValue)
    props.modelValue[`${key}_url`]
  }

  return attrs
}

function getComponent(type: string) {
  let c = resolveComponent('LazyUInput')

  switch (type) {
    case 'editor':
      c = resolveComponent('LazyUEditor')
      break

    case 'boolean':
      c = resolveComponent('LazyUBoolean')
      break

    case 'image':
      c = resolveComponent('LazyUDropzone')
      break

    case 'file':
      c = resolveComponent('LazyUDropzone')
      break

    case 'select':
      c = resolveComponent('LazyUSelect')
      break

    case 'select-multiple':
      c = resolveComponent('LazyUMultiSelect')
      break
  }

  return c
}

function getEval(value: any, key: string) {
  const e = eval(`value.${key}`)
  return e
}

function setValue(event: any, field: any[], key: string | number) {
  if (field.translations) {
    if (!propsValue.value[key]) propsValue.value[key] = {}
    return (propsValue.value[key][language.select] = event)
  }

  return (propsValue.value[key] = event)
}
</script>
