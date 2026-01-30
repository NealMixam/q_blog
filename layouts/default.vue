<template>
    <AppHeader />
    <main class="container">
      <slot /> </main>
    <AppFooter />
</template>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>