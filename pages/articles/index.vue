<template>
  <div class="articles-page">
    <h1>{{ $t('nav.articles') }}</h1>

    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">Ошибка загрузки данных</div>

    <div v-else>
      <div class="articles-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <img :src="article.image" :alt="article.title" class="article-image" />
          <div class="article-content">
            <p class="date">{{ formatDate(article.createdAt) }}</p>
            <h2>{{ article.title }}</h2>
            <p class="preview">{{ article.preview }}</p>
            <NuxtLink :to="localePath(`/articles/${article.id}`)" class="read-more">
              Читать далее
            </NuxtLink>
          </div>
        </article>
      </div>

      <div class="pagination">
        <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="pg-btn prev-next"
        >
          &larr;
        </button>

        <div class="page-numbers">
          <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              :class="['pg-btn', { active: currentPage === page }]"
          >
            {{ page }}
          </button>
        </div>

        <button
            :disabled="!articles || articles.length < limit"
            @click="changePage(currentPage + 1)"
            class="pg-btn prev-next"
        >
          &rarr;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const limit = 8;

const currentPage = computed(() => Number(route.query.page) || 1)

const visiblePages = computed(() => {
  const current = currentPage.value
  let start = Math.max(1, current - 2)
  let end = start + 4

  return Array.from({ length: 5 }, (_, i) => start + i)
})

const { data: articles, pending, error } = await useFetch<Article[]>(
    'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/',
    {
      query: {
        page: currentPage,
        limit: limit
      }
    }
)

const changePage = (newPage: number) => {
  router.push({
    query: { ...route.query, page: newPage }
  })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.pg-btn {
  background-color: $pg-bg;
  color: $pg-text;
  border: none;

  &:hover:not(:disabled) {
    background-color: $pg-hover;
  }

  &.active {
    background-color: $pg-active-bg;
    color: $pg-active-text;
  }
}

.read-more {
  background-color: $btn-read-more;
  color: $color-black;
  // твои остальные стили
}
.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}
</style>