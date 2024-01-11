export default {
  lazy: true,
  strategy: 'prefix_and_default', // 'no_prefix',
  defaultLocale: 'uk',
  langDir: 'locales',
  locales: [
    {
      lang: 'uk',
      code: 'uk',
      iso: 'UK',
      file: 'uk.json',
    },
    {
      lang: 'en',
      code: 'en',
      iso: 'EN',
      file: 'uk.json',
    },
  ],
  detectBrowserLanguage: {
    fallbackLocale: 'uk',
    useCookie: true,
    cookieKey: 'locale',
    redirectOn: 'all',
  },
}
