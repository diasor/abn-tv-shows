<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
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
      <template #end>
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>
.menu-container {
  line-height: 1.5;

  .p-menubar {
    background:
      linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) padding-box,
      linear-gradient(135deg, #5b3f73, #7a5aa6, #5b3f73) border-box;
    box-shadow:
      0 0 0 px rgba(91, 63, 115, 0.15),
      0 6px 14px rgba(91, 63, 115, 0.22);

    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }
}

a {
  font-weight: 500;
  font-family: 'Fredoka One', cursive;
  color: #5b3f73; /* dark lilac */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

a:hover {
  border-radius: 0.5rem;
  background:
    linear-gradient(180deg, #ffffff, #ede6f8) padding-box,
    linear-gradient(135deg, #4a2f61 0%, #6b4c8f 45%, #8f6ac0 75%, #5a3f76 100%) border-box;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -2px 5px rgba(63, 42, 82, 0.24),
    0 10px 24px rgba(63, 42, 82, 0.34),
    0 0 0 1px rgba(122, 90, 166, 0.35),
    0 0 20px rgba(122, 90, 166, 0.28);
}
</style>
