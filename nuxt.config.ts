// nuxt.config.ts
import { resolve } from 'path';

export default defineNuxtConfig({
  app: {
    baseURL: '/q_blog/', 
    buildAssetsDir: 'assets',
  },

  ssr: true,
  
  nitro: {
    preset: 'github-pages',
    prerender: {
      failOnError: false,
    }
  },

  modules: ['@nuxtjs/i18n', '@vueuse/nuxt'],

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
      { code: 'en', iso: 'en-US', name: 'EN', file: 'en.json', flag: '/flags/en.svg' },
      { code: 'ru', iso: 'ru-RU', name: 'RU', file: 'ru.json', flag: '/flags/ru.svg' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },

  typescript: {
    strict: true
  }
})