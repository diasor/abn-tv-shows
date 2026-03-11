<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheMenu from '@/components/the-menu/TheMenu.vue';
</script>

<template>
  <header class="app-header flex">
    <TheMenu />
  </header>

  <main class="app-main-container flex flex-column flex-1 align-items-center justify-content-start">
    <RouterView />
  </main>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #d6d2db, #6a6275, #3f3f44);
}

.app-header {
  width: calc(100% - 8rem);
  margin: 2rem 4rem;
}

.app-main-container {
  width: calc(100% - 8rem);
  margin: 2rem 4rem;
}
</style>
