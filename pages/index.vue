<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <h1>{{ $t('welcome') }}</h1>
    <p>Блог на Nuxt 3</p>
    <div class="cta">
      <NuxtLink :to="localePath('/articles')" class="btn">Перейти в блог</NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: 100px 0;

  h1 { font-size: 3rem; margin-bottom: 20px; }

  .btn {
    display: inline-block;
    background: #0070f3;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.3s;

    &:hover { background: #0051ad; }
  }
}
</style>