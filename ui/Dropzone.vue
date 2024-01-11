<template>
  <div
    ref="zone"
    class="relative flex min-h-[256px] flex-col rounded-xl border border-mischka transition-all dark:border-woodsmoke"
    :class="{ dropped: isOverDropZone }"
  >
    <div class="flex h-full flex-col items-center justify-center gap-4 p-7">
      <Icon
        class="relative top-0 h-20 w-20 transition-all"
        name="mdi:cloud-upload-outline"
      />

      <p>Choose or drop a file</p>

      <input
        class="absolute left-0 top-0 h-px w-px opacity-0"
        id="dropzone-input"
        type="file"
        :multiple="multiple"
        @change="onDrop($event.target.files)"
      />

      <label
        class="cursor-pointer rounded-md border border-cornflower-blue px-6 py-3 font-medium transition-all hover:bg-cornflower-blue hover:text-black-pearl hover:shadow-lg hover:shadow-malibu/20"
        for="dropzone-input"
      >
        Завантажити файл
      </label>
    </div>

    <div v-if="previewFile" class="grid w-full grid-cols-8 gap-2 p-3">
      <a
        v-for="item in previewFile"
        :key="item"
        class="relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-transparent px-2 transition-all hover:scale-105 hover:border-cornflower-blue"
        :href="item.url"
        target="_blank"
        :title="item.name"
      >
        <img
          v-if="isImage(item.url)"
          class="absolute left-0 top-0 h-full w-full object-cover"
          :src="item.url"
          :alt="item.name"
        />

        <Icon v-else class="h-9 w-9" name="icomoon-free:file-text2" />

        <div
          class="relative z-10 ml-auto mt-auto w-full truncate pb-1.5 text-xs !leading-4 drop-shadow-lg"
        >
          {{ item.name }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'update:preview'])
const props = defineProps<{
  modelValue: [] | File[] | File | string
  preview: string | string[] | null
  multiple?: boolean
}>()

const zone = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(zone, onDrop)

const previewFile = computed(() => {
  if (props.preview) {
    const list: any = []

    if (props.preview instanceof Array) {
      for (const item of props.preview)
        list.push({
          name: item,
          url: item,
        })
    } else
      list.push({
        name: props.preview,
        url: props.preview,
      })

    return list
  }

  return null
})

async function onDrop(files: File[] | null) {
  if (!files) return

  const value = !props.multiple
    ? await onUpload(files[0])
    : await Promise.all(files.map(async (item) => await onUpload(item)))

  if (value instanceof Array) {
    const preview = value.map((item) => item.url)
    const path = value.map((item) => item.path)

    emit('update:preview', preview)
    emit('update:modelValue', path)
    return
  }

  emit('update:preview', value.url)
  emit('update:modelValue', value.path)
}

async function onUpload(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const {
    data: {
      value: { data },
    },
  } = await useApi('admin/upload_file', {
    method: 'POST',
    body: formData,
  })

  return data
}

function isImage(path: string) {
  if (
    path.indexOf('http') !== -1 &&
    /\.(gif|jpg|jpeg|webp|png|avif)$/i.test(path)
  )
    return true
  return false
}
</script>

<style scoped lang="scss">
.dropped {
  @apply border-cornflower-blue;

  svg {
    @apply -top-1 text-cornflower-blue;
  }
}
</style>
