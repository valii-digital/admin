<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between border-b border-mischka bg-athens-gray/60 px-7 py-5 backdrop-blur-xl dark:border-woodsmoke dark:bg-cod-gray/60"
  >
    <div class="flex items-center gap-2">
      <div
        class="flex h-9 w-9 cursor-pointer items-center rounded-lg border border-mischka bg-athens-gray dark:border-woodsmoke dark:bg-cod-gray"
      >
        <Icon
          name="solar:hamburger-menu-broken"
          class="mx-auto h-4 w-4 text-black-pearl dark:text-white"
        />
      </div>

      <UAppLang />

      <!-- <div
        class="flex h-9 w-9 cursor-pointer items-center rounded-lg border border-mischka bg-athens-gray dark:border-woodsmoke dark:bg-cod-gray"
      >
        <Icon
          name="prime:language"
          class="mx-auto h-4 w-4 text-black-pearl dark:text-white"
        />
      </div> -->

      <div
        class="flex h-9 w-9 cursor-pointer items-center rounded-lg bg-cod-gray dark:bg-athens-gray"
        @click="
          $colorMode.value === 'light' || $colorMode.value === 'sepia'
            ? ($colorMode.preference = 'dark')
            : ($colorMode.preference = 'light')
        "
      >
        <Icon
          :name="
            $colorMode.value === 'light' || $colorMode.value === 'sepia'
              ? 'solar:sun-2-linear'
              : 'solar:moon-linear'
          "
          class="mx-auto h-4 w-4 text-white dark:text-black-pearl"
        />
      </div>
    </div>

    <div class="flex cursor-pointer items-center gap-2.5">
      <div class="flex flex-col items-end gap-0.5">
        <div class="text-sm font-semibold">{{ data.email }}</div>

        <div class="text-xs font-medium opacity-60">Адміністратор</div>
      </div>

      <div
        class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1EB306] !text-white"
      >
        {{ data.email[0] ?? '??' }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { data } = useUserStore()
</script>
