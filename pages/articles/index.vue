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

// const formatDate = (dateString: string) => {
//   return new Date(dateString).toLocaleDateString('ru-RU', {
//     day: 'numeric', month: 'long', year: 'numeric'
//   })
// }
</script>

<style lang="scss" scoped>
.articles-page {
  padding: 120px 0 140px 0;
}

.articles-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px 32px;
  margin-top: 40px;
}

.article-card {
  max-width: 280px;
}

.article-image {
  width: 100%;
  height: 280px;
}

.article-content {
  font-size: 20px;
  margin-top: 24px;

  & h2 {
    font-size: 22px;
    line-height: 120%;
    margin-bottom: 12px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 50px;
}

.pg-btn {
  width: 44px;
  height: 44px;
  background-color: $pg-bg;
  color: $pg-text;
  border: none;
  border-radius: 12px;
  transition: background-color, color 0.6;
  cursor: pointer;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    background-color: $pg-hover;
  }

  &.active {
    background-color: $pg-active-bg;
    color: $pg-active-text;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.prev-next {
    background: transparent;
    border: 1px solid $pg-hover;
  }
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.read-more {
  display: block;
  color: $btn-read-more;
  margin-top: 12px;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 20px;
}
</style>