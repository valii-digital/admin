<template>
  <div class="custom-editor relative min-h-[250px]">
    <div
      v-if="placeholder"
      class="absolute -top-1.5 left-2 bg-athens-gray px-1 text-xs opacity-70 transition-all dark:bg-cod-gray"
    >
      {{ placeholder }}
    </div>

    <QuillEditor
      v-model:content="propsValue"
      :options="options"
      contentType="html"
      placeholder="Compose an epic..."
    />
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  readonly?: boolean
  modelValue: string | null
  placeholder?: string
}>()

const options = ref({
  // debug: 'info',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],
    ],
  },
  readOnly: props.readonly,
  // theme: 'snow',
})

const propsValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
</script>

<style lang="scss">
.custom-editor {
  @apply rounded-xl border border-mischka dark:border-woodsmoke;

  .ql-toolbar {
    @apply border-x-0 border-b border-t-0 border-mischka dark:border-woodsmoke;

    button {
      border: 1px solid transparent;
    }

    .ql-formats {
      button,
      span[role='button'] {
        @apply border hover:border-cornflower-blue dark:hover:border-cornflower-blue;
      }

      * {
        @apply rounded text-black-pearl dark:text-cararra;
        @apply bg-athens-gray dark:bg-cod-gray #{!important};

        svg {
          .ql-stroke {
            @apply stroke-black-pearl dark:stroke-cararra;
          }

          .ql-fill {
            @apply fill-black-pearl dark:fill-cararra;
          }
        }
      }
    }
  }

  .ql-container {
    @apply border-0;
  }

  .ql-editor * {
    @apply leading-normal text-black-pearl dark:text-cararra #{!important};
  }
}
</style>
