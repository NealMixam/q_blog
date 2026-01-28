<template>
  <div class="articles-page">
    <h1>{{ $t('nav.articles') }}</h1>

    <div v-if="pending" class="loading">Загрузка...</div>

    <div v-else-if="error" class="error">Ошибка загрузки</div>

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
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
            class="pg-btn"
        >
          &laquo; Назад
        </button>

        <span class="page-info">Страница {{ currentPage }}</span>

        <button
            :disabled="!articles || articles.length < limit"
            @click="changePage(currentPage + 1)"
            class="pg-btn"
        >
          Вперед &raquo;
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

const limit = 6;

const currentPage = computed(() => Number(route.query.page) || 1)

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
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.article-card {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }

  .article-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .article-content {
    padding: 1.5rem;

    .date { font-size: 0.8rem; color: #888; }
    h2 { font-size: 1.25rem; margin: 0.5rem 0; color: #333; }
    .preview { font-size: 0.9rem; color: #666; line-height: 1.4; margin-bottom: 1rem; }

    .read-more {
      color: #0070f3;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
    }
  }
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}
</style>