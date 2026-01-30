<script setup lang="ts">
const offices = [
  {
    city: 'Office in Russia',
    address: '139 Ruben Station Lake Drew, NM 52678',
    telegram: 'https://t.me/qtim'
  },
  {
    city: 'Office in Dubai',
    address: '139 Ruben Station Lake Drew, NM 52678',
    telegram: 'https://t.me/qtim'
  }
]

const socialLinksLeft = [
  { text: 'Facebook', url: '#' },
  { text: 'Instagram', url: '#' },
  { text: 'Telegram', url: '#' },
]

const socialLinksRight = [
  { text: 'Behance', url: '#' },
  { text: 'LinkedIn', url: '#' },
  { text: 'Privacy Policy', url: '#' }
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<template>
  <footer class="footer">
    <div class="container">
      <p class="footer__subtitle">Is there a project?</p>

      <div class="footer__main">
        <div class="footer__title-block">
          <h2 class="footer__title">Let’s work together</h2>
        </div>

        <div class="footer__contacts">
          <div class="footer__item">
            <p>For all questions</p>
            <a href="tel:+79202780068">+7 (920) 278—00—68</a>
            <a href="mailto:qtim@agency.com">qtim@agency.com</a>
          </div>

          <div v-for="office in offices" :key="office.city" class="footer__item">
            <p>{{ office.city }}</p>
            <p>{{ office.address }}</p>
            <a v-if="office.telegram" :href="office.telegram" class="telegram-link">
              <img src="~/assets/images/telegram.svg" alt="Telegram" class="footer__icon">
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__social">
          <ul class="social-list">
            <li v-for="link in socialLinksLeft" :key="link.text">
              <a :href="link.url">{{ link.text }}</a>
            </li>
          </ul>

          <ul class="social-list">
            <li v-for="link in socialLinksRight" :key="link.text">
              <a :href="link.url">{{ link.text }}</a>
            </li>
          </ul>
        </div>

        <div class="footer__go-top">
          <button @click="scrollToTop" class="go-top-btn">Go</button>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  padding-top: 140px;
  background-color: $color-lavender;

  @include tablet {
    padding: 60px 40px 0;
  }

  @include mobile {
    padding: 60px 20px 0;
  }

  &__main {
    display: flex;
    gap: 368px;
    margin-top: 56px;

    @include tablet {
      flex-direction: column;
      gap: 60px;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 112px;
    line-height: 100%;
    text-decoration: underline solid 1px;
    padding-bottom: 2px;
    max-width: 464px;

    @include tablet {
      font-size: 80px;
    }

    @include mobile {
      font-size: 48px;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 160px;

    @include tablet {
      max-width: 100%;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &__bottom {
    position: relative;
    margin-top: 140px;
    height: 180px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;

    @include mobile {
      margin-top: 80px;
      height: unset;
    }
  }

  &__social {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 50px;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;
      margin-bottom: 20px;
    }
  }

  &__go-top {
    position: absolute;
    bottom: -179px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    @include mobile {
      left: 60%;
      bottom: -99px;
    }

    .go-top-btn {
      width: 358px;
      height: 358px;
      background-color: $color-black;
      color: $color-white;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 122px;
      font-size: 32px;
      line-height: 100%;
      transition: padding-top 0.3s ease;

      &:hover {
        padding-top: 66px;
      }

      @include mobile {
        width: 200px;
        height: 200px;
        padding-top: 40px;
        font-size: 24px;
      }
    }
  }

  .social-list {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 12px 32px;
    list-style: none;
    padding: 0;

    a {
      text-decoration: none;
      border-bottom: 1px solid currentColor;
      padding-bottom: 2px;
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
}
</style>