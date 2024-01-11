<template>
  <div v-if="isLangSelect" class="flex gap-2">
    <div
      v-for="(item, index) in language.data"
      :key="index"
      :class="[
        'flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-mischka px-3 transition-all hover:border-malibu hover:shadow-lg hover:shadow-malibu/20 dark:border-woodsmoke dark:hover:border-malibu',
        {
          '!border-screamin-green !shadow-screamin-green/20':
            index === language.select,
        },
      ]"
      v-auto-animate
      @click="language.select = index"
    >
      {{ item }}

      <Icon
        v-if="index === language.select"
        class="text-screamin-green opacity-80"
        name="ph:check-bold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ fields?: any[] }>()
const router = useRouter()
const route = useRoute()
const language = useLanguageStore()

const isLangSelect = computed(() => {
  const fields = props.fields

  if (typeof fields === 'object') {
    for (const field in fields) if (fields[field].translations) return true
    return false
  }

  return true
})

watch(
  () => language.select,
  (newVallue) => {
    router.push({ query: { ...route.query, lang: newVallue } })
  },
)
</script>
