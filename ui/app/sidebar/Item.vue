<template>
  <div v-auto-animate>
    <div
      class="flex h-9 max-w-full items-center justify-between gap-2 rounded-md px-1"
    >
      <component
        :is="value.url?.length ? link : 'div'"
        class="flex w-full cursor-pointer items-center gap-2 truncate opacity-80 hover:opacity-100"
        :to="localePath(value.url ? `/${value.url}` : '')"
        @click="isOpen = !isOpen"
      >
        <Icon class="flex-shrink-0" :name="value.icon" />

        {{ value.name }}
      </component>

      <div
        v-if="value.childs?.length"
        :class="[
          'flex h-7 w-7 flex-shrink-0 cursor-pointer items-center rounded-md border border-transparent opacity-80 transition-all hover:border-mischka hover:opacity-100 dark:hover:border-woodsmoke',
          { '-rotate-180': isOpen },
        ]"
        @click="isOpen = !isOpen"
      >
        <Icon class="mx-auto" name="formkit:down" />
      </div>
    </div>

    <div
      v-if="isOpen && value.childs?.length"
      class="mt-2 grid grid-cols-[28px_auto]"
    >
      <div class="flex justify-center">
        <div class="h-full w-px bg-mischka dark:bg-woodsmoke" />
      </div>

      <div class="flex flex-col gap-2">
        <component
          v-for="item in value.childs"
          :key="item.id"
          :is="item.url?.length ? link : 'div'"
          class="flex h-8 w-full items-center gap-2 truncate rounded-md px-1 opacity-80 hover:opacity-100"
          :style="{ cursor: item.url?.length ? 'pointer' : 'default' }"
          :to="localePath(`/${item.url}`)"
        >
          <Icon class="flex-shrink-0" :name="item.icon" />

          {{ item.name }}
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MenuElement {
  id: number
  name: string
  icon: string
  url: string
  parent_id?: number
  childs?: MenuElement[]
}

const link = resolveComponent('NuxtLink')

defineProps<{ value: MenuElement }>()

const localePath = useLocalePath()
const isOpen = ref(false)
</script>
