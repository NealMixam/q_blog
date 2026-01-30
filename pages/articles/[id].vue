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
        <h1>{{ article.title }}</h1>
        <p class="date">{{ formatDate(article.createdAt) }}</p>
      </header>

      <img
          :src="getImageUrl(article.id)"
          :alt="article.title"
          class="article-image"
      />

      <div class="content">
        <p class="description">{{ article.description }}</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'
const { getImageUrl } = useArticleHelpers()

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
.article-detail {
  padding: 120px 0 140px;
  max-width: 1216px; 
  margin: 0 auto;

  @include tablet {
    padding: 80px 20px 100px;
  }

  @include mobile {
    padding: 40px 16px 60px;
  }
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
}

.full-article {
  header {
    margin-bottom: 72px;

    @include mobile {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 84px;
      line-height: 100%;
      font-weight: 400;
      margin-bottom: 0;

      @include tablet {
        font-size: 56px;
      }

      @include mobile {
        font-size: 36px;
      }
    }

    .date {
      display: none; 
    }
  }
}

.article-image {
  width: 100%;
  height: 700px; 
  object-fit: cover;
  margin-bottom: 80px;

  @include tablet {
    height: 450px;
    margin-bottom: 40px;
  }

  @include mobile {
    height: 250px;
    margin-bottom: 32px;
  }
}

.content {
  max-width: 695px; 
  
  .description {
    font-size: 36px;
    line-height: 124%;
    letter-spacing: -0.01em;

    @include tablet {
      font-size: 28px;
    }

    @include mobile {
      font-size: 20px;
    }
  }
  
  &::before {
    content: 'About';
    display: block;
    font-size: 16px;
    margin-bottom: 32px;

    @include mobile {
      margin-bottom: 24px;
    }
  }
}

.loading, .error {
  text-align: center;
  padding: 100px 0;
  font-size: 24px;
}
</style>