<template>
  <header class="header">
    <nav class="nav container">
      <NuxtLink :to="localePath('/')" class="logo">
        <svg width="84" height="25" viewBox="0 0 84 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.2594 25C10.5869 25 8.2457 24.4981 6.23567 23.4944C4.24848 22.4907 2.70669 21.0551 1.61031 19.1877C0.53677 17.3203 0 15.1494 0 12.6751C0 10.1774 0.54819 7.97152 1.64457 6.05742C2.76379 4.11998 4.28274 2.62605 6.2014 1.57563C8.14291 0.52521 10.3128 0 12.7112 0C15.0867 0 17.2337 0.52521 19.1524 1.57563C21.0939 2.62605 22.6129 4.11998 23.7092 6.05742C24.8285 7.97152 25.3881 10.1774 25.3881 12.6751C25.3881 14.3557 25.0226 15.9664 24.2917 17.507C23.5608 19.0243 22.6129 20.2264 21.4479 21.1134H25.8335V25H13.2594ZM12.7112 20.9734C15.2465 20.9734 17.2566 20.2498 18.7413 18.8025C20.2488 17.3553 21.0025 15.3128 21.0025 12.6751C21.0025 10.9477 20.6371 9.43044 19.9062 8.12325C19.1752 6.81606 18.1816 5.81233 16.9254 5.11205C15.6691 4.41177 14.2644 4.06162 12.7112 4.06162C11.158 4.06162 9.7418 4.41177 8.46269 5.11205C7.20642 5.81233 6.21282 6.81606 5.4819 8.12325C4.75098 9.43044 4.38552 10.9477 4.38552 12.6751C4.38552 15.3361 5.12786 17.3903 6.61255 18.8375C8.12007 20.2614 10.1529 20.9734 12.7112 20.9734Z"
            fill="#101010" />
          <path d="M33.9455 4.20168H26.7163V0.52521H45.526V4.20168H38.2968V25H33.9455V4.20168Z" fill="#101010" />
          <path d="M49.6329 0.52521H53.9842V25H49.6329V0.52521Z" fill="#101010" />
          <path
            d="M59.4685 0.52521H63.717L71.7342 18.4524L79.7515 0.52521H84V25H79.8886V9.10364L72.7621 25H70.7064L63.5799 9.10364V25H59.4685V0.52521Z"
            fill="#101010" />
        </svg>
      </NuxtLink>

      <div class="nav-right">
        <ul class="nav-links">
          <li>
            <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/works')">{{ $t('nav.works') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/articles')">{{ $t('nav.articles') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink>
          </li>
        </ul>

        <div class="lang-switcher-custom" ref="target">
          <button @click="isOpen = !isOpen" class="dropdown-toggle">
            <img v-if="currentLocale" :src="currentLocale.flag" :alt="currentLocale.name" class="flag-icon" />
          </button>
          <ul v-if="isOpen" class="dropdown-menu">
            <li v-for="item in locales" :key="item.code" @click="handleSelect(item.code)"
              :class="{ active: locale === item.code }">
              <img :src="item.flag" class="flag-icon" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>

        <button class="burger" @click="isMenuOpen = !isMenuOpen" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <transition name="fade">
      <div v-if="isMenuOpen" class="mobile-menu">
        <ul class="mobile-nav-links">
          <li v-for="link in ['home', 'works', 'articles', 'about']" :key="link" @click="isMenuOpen = false">
            <NuxtLink :to="localePath(link === 'home' ? '/' : `/${link}`)">
              {{ $t(`nav.${link}`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const isOpen = ref(false)
const isMenuOpen = ref(false)
const target = ref(null)

onClickOutside(target, () => {
  isOpen.value = false
})

const currentLocale = computed(() => {
  return locales.value.find(i => i.code === locale.value)
})

const handleSelect = (code: string) => {
  setLocale(code)
  isOpen.value = false
}

const route = useRoute()
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>

<style lang="scss" scoped>
.header {
  padding: 36px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: $color-white;

  @include mobile {
    padding: 20px;
  }

  .nav {
    max-width: 1360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 40px;

    @include mobile {
      gap: 16px;
    }

    .burger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      width: 32px;
      height: 32px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 200;
      gap: 6px;

      @include mobile {
        display: flex;
      }

      span {
        display: block;
        height: 2px;
        background: #101010;
        transition: all 0.3s ease;

        &:first-child {
          width: 100%;
        }

        &:last-child {
          width: 70%;
        }

      }

      &.is-active {
        span {
          width: 100% !important;

          &:first-child {
            transform: translateY(4px) rotate(45deg);
          }

          &:last-child {
            transform: translateY(-4px) rotate(-45deg);
          }
        }
      }
    }

    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #fff;
      z-index: 150;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;

      .mobile-nav-links {
        list-style: none;
        padding: 0;
        text-align: center;

        li {
          margin: 20px 0;

          a {
            font-size: 32px;
            text-decoration: none;
            color: #101010;
            font-weight: 500;

            &.router-link-active {
              color: $color-lavender;
            }
          }
        }
      }
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }

    .nav-links {
      @include mobile {
        display: none;
      }
    }

    .nav-links {
      display: flex;
      gap: 58px;
      list-style: none;
      margin: 0;
      padding: 0;

      @include tablet {
        gap: 24px;
      }

      @include mobile {
        display: none;
      }

      a {
        text-decoration: none;
        color: #333;

        &.router-link-active {
          color: $color-lavender;
          text-decoration: underline solid 1px;
        }
      }
    }

    @include tablet {
      padding: 24px 20px;
    }

    @include mobile {
      padding: 16px;
    }
  }

  .lang-switcher-custom {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin: 0;
    background-color: transparent;
    border: 2px solid #0000001A;
    border-radius: 100%;
    transition: all 0.3s ease;
    cursor: pointer;
    box-sizing: border-box;

    @include mobile {
      width: 40px;
      height: 40px;
    }

    &:hover,
    &:focus,
    &:active {
      opacity: 0.7;
    }

    .flag-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;

      @include mobile {
        width: 20px;
        height: 20px;
      }
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    left: auto;
    z-index: 110;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 8px;
    min-width: 140px;
    overflow: hidden;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      cursor: pointer;
      border-radius: 8px;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }

      &.active {
        background-color: rgba($color-lavender, 0.1);
        color: $color-lavender;
        font-weight: 600;
      }

      .flag-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }

  svg {
    flex-shrink: 0;

    @include mobile {
      width: 64px;
      height: auto;
    }
  }
}
</style>\