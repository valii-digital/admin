<template>
  <nav v-if="pages > 1" class="flex w-full justify-between">
    <div class="flex items-center gap-2.5">
      <template v-if="pages > 6">
        <NuxtLink
          v-for="i in first"
          :key="i"
          :to="localePath({ query: { page: i } })"
          :class="['item', { active: i == active }]"
        >
          {{ i }}
        </NuxtLink>

        <div class="flex h-px items-center px-2 pb-2">...</div>

        <template v-if="active >= 3 && active + 1 < pages">
          <template v-for="i in pages">
            <NuxtLink
              v-if="i >= active - 1 && i <= active + 1"
              :key="i"
              :to="localePath({ query: { page: i } })"
              :class="['item', { active: i == active }]"
            >
              {{ i }}
            </NuxtLink>
          </template>

          <div class="flex h-px items-center px-2 pb-2">...</div>
        </template>

        <template v-for="i in pages">
          <NuxtLink
            v-if="
              (i > pages - 3 && active >= pages - 1) ||
              i == pages ||
              (active < 3 && i >= pages - 2)
            "
            :key="i"
            :to="localePath({ query: { page: i } })"
            :class="['item', { active: i == active }]"
          >
            {{ i }}
          </NuxtLink>
        </template>
      </template>

      <template v-else>
        <NuxtLink
          v-for="i in pages"
          :key="i"
          :to="localePath({ query: { page: i } })"
          :class="[
            'item',
            {
              active: i == active,
            },
          ]"
        >
          {{ i }}
        </NuxtLink>
      </template>
    </div>

    <!-- <button v-if="isMore" class="load-more" @click="emit('loadMore')">
      Завантажити ще
    </button> -->
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits(['loadMore'])
const props = defineProps<{ pages: number; isMore?: boolean }>()

const route = useRoute()
const localePath = useLocalePath()

const active = computed(() => (route.query.page ? Number(route.query.page) : 1))

const first = computed(() => {
  if (active.value < 3 || active.value >= props.pages - 1) return 3
  return 1
})
</script>

<style lang="scss" scoped>
.item {
  @apply flex h-10 w-10 items-center justify-center rounded-md border border-mischka font-semibold transition-all hover:border-cornflower-blue dark:border-woodsmoke dark:hover:border-cornflower-blue;

  &.active {
    @apply border-transparent bg-cornflower-blue text-black-pearl hover:shadow-xl hover:shadow-cornflower-blue/25;
  }
}
</style>
