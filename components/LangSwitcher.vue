<template>
  <div class="lang-switcher">
    <NuxtLink :to="switchLocalePath('ru')" :class="{ active: locale === 'ru' }">RU</NuxtLink>
    <span> | </span>
    <NuxtLink :to="switchLocalePath('en')" :class="{ active: locale === 'en' }">EN</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<style lang="scss" scoped>
.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>