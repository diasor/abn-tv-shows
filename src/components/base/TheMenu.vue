<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'About',
    icon: 'pi pi-question-circle',
    command: () => {
      router.push('/about');
    },
  },
]);
</script>

<template>
  <div class="menu-container card flex justify-center align-items-center">
    <Menubar :model="items">
      <template #start>
        <span class="pi pi-desktop" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menubar>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.menu-container {
  line-height: 1.5;

  .p-menubar {
    background: $background-gradient;
    box-shadow: $box-shadow-gradient;
    transition: $playful-transition;
  }
}

a {
  font-weight: 500;
  font-family: $font-playful;
  color: $color-lilac-dark;
  text-shadow: $font-text-shadow-playful;
  text-decoration: none;
}

a:hover {
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}
</style>
