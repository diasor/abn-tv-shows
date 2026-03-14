<script setup lang="ts">
import { ref } from 'vue';
import Galleria from 'primevue/galleria';

const images = ref([
  {
    itemImageSrc: '/responsiveness/dashboard(laptop mac air pro).png',
    thumbnailImageSrc: '/responsiveness/dashboard(laptop mac air pro).png',
    alt: 'Dashboard on laptop',
  },
  {
    itemImageSrc: '/responsiveness/details (laptop air pro)-front.png',
    thumbnailImageSrc: '/responsiveness/details (laptop air pro)-front.png',
    alt: 'Details page on laptop',
  },
  {
    itemImageSrc: '/responsiveness/dashboard(iPad Pro)-portrait.png',
    thumbnailImageSrc: '/responsiveness/dashboard(iPad Pro)-portrait.png',
    alt: 'Dashboard on iPad Pro',
  },
  {
    itemImageSrc: '/responsiveness/dashboard(iPhone 14 Pro Max) (1)-portrait.png',
    thumbnailImageSrc: '/responsiveness/dashboard(iPhone 14 Pro Max) (1)-portrait.png',
    alt: 'Dashboard on iPhone 14 Pro Max',
  },
  {
    itemImageSrc: '/responsiveness/details-page(iPhone 14 Pro Max)-portrait.png',
    thumbnailImageSrc: '/responsiveness/details-page(iPhone 14 Pro Max)-portrait.png',
    alt: 'Details page on iPhone 14 Pro Max',
  },
  {
    itemImageSrc: '/responsiveness/desktop-skeleton-dashboard-front.png',
    thumbnailImageSrc: '/responsiveness/desktop-skeleton-dashboard-front.png',
    alt: 'Desktop skeleton dashboard front',
  },
  {
    itemImageSrc: '/responsiveness/desktop-details-skeleton-front.png',
    thumbnailImageSrc: '/responsiveness/desktop-details-skeleton-front.png',
    alt: 'Desktop skeleton details front',
  },
]);

const responsiveOptions = ref([
  { breakpoint: '1300px', numVisible: 4 },
  { breakpoint: '575px', numVisible: 1 },
]);
</script>

<template>
  <div class="card">
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 640px"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="slotProps.item.thumbnailImageSrc"
          :alt="slotProps.item.alt"
          class="thumbnail-img"
        />
      </template>
    </Galleria>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.card {
  border: 1px solid $color-lilac-darker;
  border-radius: 8px;
  overflow: hidden;
  max-width: 640px;
}

.thumbnail-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
</style>
