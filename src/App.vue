<script setup lang="ts">
import { RouterView } from 'vue-router';
import Menubar from 'primevue/menubar';

const menuItems = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
];
</script>

<template>
  <div class="main-container">
    <header>
      <Menubar :model="menuItems" />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin: 2rem auto;
  max-width: calc(100vw - 10rem);
}

main {
  /* margin: 5rem auto; */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  /* min-height: calc(100vh - 200px); */
}

.main-container {
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}
</style>
