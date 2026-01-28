// nuxt.config.ts
import { resolve } from 'path';

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  alias: {
    '@': resolve(__dirname, '/')
  },

  css: [
    resolve(__dirname, 'assets/css/main.scss')
  ],

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