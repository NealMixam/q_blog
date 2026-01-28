<template>
  <header class="header">
    <nav class="container">
      <div class="logo">Blog</div>

      <ul class="nav-links">
        <li><NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/works')">{{ $t('nav.works') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/articles')">{{ $t('nav.articles') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink></li>
      </ul>

      <div class="lang-switcher">
        <button
            v-for="item in locales"
            :key="typeof item === 'object' ? item.code : item"
            @click="setLocale(typeof item === 'object' ? item.code : item)"
            :class="{ active: locale === (typeof item === 'object' ? item.code : item) }"
        >
          {{ typeof item === 'object' ? item.name : item }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;

    a {
      text-decoration: none;
      color: #333;
      &.router-link-active { color: #0070f3; font-weight: bold; }
    }
  }

  .lang-switcher {
    button {
      border: none;
      background: none;
      cursor: pointer;
      margin-left: 5px;
      &.active { font-weight: bold; text-decoration: underline; }
    }
  }
}
</style>