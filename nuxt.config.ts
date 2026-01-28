// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  css: [
    '@/assets/css/main.scss'
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US' },
      { code: 'ru', name: 'Русский', iso: 'ru-RU' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  typescript: {
    strict: true
  }
})