<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <h1>{{ $t('welcome') }}</h1>
    <div class="cta">
      <NuxtLink :to="localePath('/articles')" class="btn">Перейти в блог</NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: 100px 0;
}

.cta {

  .btn {
    display: block;
    margin: 24px auto 0;
    max-width: 160px;
    font-size: 20px;
    line-height: 100%;
    padding: 10px 12px;
    background-color: $color-black;
    color: $color-white;
    border-radius: 12px;
  }
}
</style>