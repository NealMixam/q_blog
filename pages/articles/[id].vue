<template>
  <div class="article-detail">
    <button @click="$router.back()" class="back-btn">
      &larr; Назад к списку
    </button>

    <div v-if="pending" class="loading">Загрузка статьи...</div>

    <div v-else-if="error" class="error">
      Статья не найдена или произошла ошибка.
    </div>

    <article v-else-if="article" class="full-article">
      <header>
        <p class="date">{{ formatDate(article.createdAt) }}</p>
        <h1>{{ article.title }}</h1>
      </header>

      <img :src="article.image" :alt="article.title" class="main-image" />

      <div class="content">
        <p class="description">{{ article.description }}</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const route = useRoute()
const id = route.params.id

const { data: article, pending, error } = await useFetch<Article>(
    `https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/${id}`
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useHead({
  title: article.value ? `${article.value.title} | Мой Блог` : 'Загрузка...'
})
</script>

<style lang="scss" scoped>
</style>