<template>
  <div class="articles-page">
    <h1>{{ $t('nav.articles') }}</h1>

    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">Ошибка загрузки данных</div>

    <div v-else>
      <div class="articles-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <img
              :src="getImageUrl(article.id)"
              :alt="article.title"
              class="article-image"
          />
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
const { getImageUrl } = useArticleHelpers()

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

  @include tablet {
    padding: 80px 20px 100px;
  }

  @include mobile {
    padding: 40px 16px 60px;
  }

  h1 {
    @include mobile {
      font-size: 32px;
    }
  }
}

.articles-grid {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px 32px;
  margin-top: 40px;

  @include mobile {
    gap: 30px;
    margin-top: 24px;
  }
}

.article-card {
  width: calc(25% - 24px);
  max-width: 280px;

  @include respond-to(1200px) {
    width: calc(33.33% - 22px);
  }

  @include tablet {
    width: calc(50% - 16px);
    max-width: none;
  }

  @include mobile {
    width: 100%;
  }
}

.article-image {
  width: 100%;
  height: 280px;
  object-fit: cover;

  @include mobile {
    height: 200px;
  }
}

.article-content {
  font-size: 20px;
  margin-top: 24px;

  @include mobile {
    font-size: 18px;
    margin-top: 16px;
  }

  & h2 {
    font-size: 22px;
    line-height: 120%;
    margin-bottom: 12px;

    @include mobile {
      font-size: 20px;
    }
  }
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 50px;

  @include mobile {
    justify-content: center;
    margin-top: 40px;
  }
}

.pg-btn {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $pg-bg;
  color: $pg-text;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
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

  @include mobile {
    width: 38px;
    height: 38px;
    border-radius: 8px;
  }
}

.page-numbers {
  display: flex;
  gap: 8px;

  @include mobile {
    gap: 4px;
  }
}

.read-more {
  display: block;
  color: $btn-read-more;
  margin-top: 12px;

  &:hover {
    text-decoration: underline;
  }
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 20px;
}
</style>