<template>
  <div class="article-detail">
    <NuxtLink :to="localePath('/articles')">← Назад к списку</NuxtLink>

    <div v-if="pending">Загрузка...</div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <div class="content">
        {{ post.body }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>