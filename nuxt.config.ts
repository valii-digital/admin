import i18n from './config/i18n'
import googleFonts from './config/googleFonts'
import tailwindcss from './config/tailwindcss'
import colorMode from './config/colorMode'
import pinia from './config/pinia'

export default defineNuxtConfig({
  //! https://nuxt.com/docs/api/configuration/nuxt-config
  ssr: false,

  //! App configuration
  app: {
    head: {
      title: 'Project Admin',
    },
  },

  //! Style import
  css: ['@/assets/styles/_main.scss'],

  //! Components configuration
  components: [
    {
      path: '~/ui',
      prefix: 'U',
    },
    {
      path: '~/components',
      // global: true,
    },
  ],

  //! Modules import
  modules: [
    '@nuxtjs/i18n', // https://nuxt.com/modules/i18n
    '@vueuse/nuxt', // https://vueuse.org/guide/,
    '@pinia/nuxt', // https://nuxt.com/modules/pinia
    '@nuxtjs/tailwindcss', // https://nuxt.com/modules/tailwindcss
    '@nuxtjs/color-mode', // https://nuxt.com/modules/color-mode
    '@nuxtjs/google-fonts', // https://nuxt.com/modules/google-fonts
    '@formkit/auto-animate/nuxt', // https://nuxt.com/modules/auto-animate
    'nuxt-icon', // https://nuxt.com/modules/icon
  ],

  //! Impotr configuration
  imports: {
    dirs: ['stores'],
  },

  //! Rubtime configuration
  runtimeConfig: {
    public: {
      API_URL: process.env.BASE_URL,
    },
  },

  //! Configuration file
  // ...config,
  i18n,
  googleFonts,
  tailwindcss,
  colorMode,
  pinia,
})
