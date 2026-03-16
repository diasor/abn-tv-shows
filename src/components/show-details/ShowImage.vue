<script setup lang="ts">
import Image from 'primevue/image';
import { type TVShowImage } from '@/schemas/images';

interface IShowImageProps {
  image?: TVShowImage;
  alt: string;
  showPreview: boolean;
}
const props = defineProps<IShowImageProps>();
</script>

<template>
  <Image v-if="props.showPreview" preview class="tv-show-image-preview">
    <template #image>
      <img :src="props.image?.original" :alt="props.alt" class="tv-show-image-full" />
    </template>
    <template #preview="slotProps">
      <img
        :src="props.image?.original"
        :alt="props.alt"
        :style="slotProps.style"
        @click="slotProps.previewCallback"
        class="tv-show-image-overlay"
      />
    </template>
  </Image>
  <img v-else :src="props.image?.medium" :alt="props.alt" class="tv-show-image" />
</template>

<style lang="scss" scoped>
.tv-show-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.tv-show-image-preview {
  flex: 1;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.tv-show-image-full {
  width: 100%;
  height: auto;
  max-height: 500px;
  display: block;
  border-radius: 0.5rem;
  object-fit: cover;
}

.tv-show-image-overlay {
  max-width: 100vw;
  max-height: 100vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
}
</style>
