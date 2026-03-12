<script setup lang="ts">
import { computed } from 'vue';
import Image from 'primevue/image';
import type { TVShowImage } from '@/schemas/Shows';

interface IShowImageProps {
  image?: TVShowImage;
  alt: string;
  showPreview: boolean;
}
const props = defineProps<IShowImageProps>();

const showDefault = computed((): boolean =>
  !props.image || (!props.image.medium && !props.image.original) ? false : true,
);
</script>

<template>
  <Image v-if="props.showPreview" preview class="show-image-preview">
    <template #image>
      <img :src="props.image?.original" :alt="props.alt" class="tv-show-image-full" />
    </template>
    <template #preview="slotProps">
      <img :src="props.image?.original" :alt="props.alt" @click.prevent="slotProps" />
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

.show-image-preview {
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  border-radius: 0.5rem;
}

.tv-show-image-full {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 50vh;
  display: block;
  border-radius: 0.5rem;
  object-fit: cover;
}

.show-image-preview :deep(.p-image),
.show-image-preview :deep(.p-image-preview-container) {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>
