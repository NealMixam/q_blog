// nuxt.config.ts
import { resolve } from 'path';

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  alias: {
    '@': resolve(__dirname, '/')
  },

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *; @use "~/assets/scss/_mixins.scss" as *;'
        }
      }
    }
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'EN', file: 'en.json' },
      { code: 'ru', iso: 'ru-RU', name: 'RU', file: 'ru.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default'
  },

  typescript: {
    strict: true
  }
})