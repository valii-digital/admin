<template>
  <div class="h-full">
    <nav class="sticky top-0 max-h-screen overflow-y-auto">
      <NuxtLink
        class="flex w-full items-center border-b border-mischka px-7 py-5 dark:border-woodsmoke"
        :to="localePath('/')"
      >
        <img
          v-if="$colorMode.value === 'light' || $colorMode.value === 'sepia'"
          class="mr-auto h-9 max-w-full"
          src="@/assets/icons/logo-light.svg"
        />

        <img
          v-else
          class="mr-auto h-9 max-w-full"
          src="@/assets/icons/logo-dark.svg"
        />
      </NuxtLink>

      <div
        class="flex flex-col gap-3 border-b border-mischka px-7 py-5 dark:border-woodsmoke"
        v-auto-animate
      >
        <div class="mb-1 text-xs font-semibold opacity-70">Сторінки</div>

        <NuxtLink
          v-if="isFindPath('/')"
          class="ui--hover-title flex h-9 w-full items-center gap-2 truncate rounded-md px-1 opacity-80 hover:opacity-100"
          :to="localePath('/')"
        >
          <Icon name="iconoir:graph-up" class="flex-shrink-0" />

          Дашборд
        </NuxtLink>

        <NuxtLink
          v-if="isFindPath('menu-configuration')"
          class="flex h-9 w-full items-center gap-2 truncate rounded-md px-1 opacity-80 hover:opacity-100"
          :to="localePath('/menu-configuration')"
        >
          <Icon name="icon-park-outline:add-web" class="flex-shrink-0" />

          Управління меню
        </NuxtLink>

        <UAppSidebarItem
          v-for="item in navigate.data"
          :key="item.id"
          :value="item"
        />

        <a
          class="flex h-9 w-full items-center gap-2 truncate rounded-md px-1 opacity-80 hover:opacity-100"
          :href="'https://google.com'"
          target="_blank"
        >
          <Icon name="icon-park-outline:download-web" class="flex-shrink-0" />

          На сайт
        </a>
      </div>

      <div class="flex flex-col gap-3 px-7 py-5">
        <div
          class="flex h-9 w-full cursor-pointer items-center gap-2 truncate opacity-80 hover:opacity-100"
          @click="logout()"
        >
          <Icon class="flex-shrink-0" name="solar:logout-2-linear" />

          Вийти
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const navigate = useNavigateStore()
const { logout } = useAuth()

function isFindPath(path: string) {
  const url = navigate.data.find(({ url }) => url === path)
  console.log(url)
  return !url
}
</script>
