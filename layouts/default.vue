<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="container">
      <slot /> </main>
    <footer class="footer">
      <p>&copy; 2026 Test Task App</p>
    </footer>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
}
.footer {
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>