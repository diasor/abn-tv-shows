<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import { getGenreConfig } from '@/shared/genres';
import type { Genre } from '@/schemas/genres';
import { useGenreStore } from '@/stores/useGenreStore';

interface IShowGenreProps {
  genre: Genre;
}
const props = defineProps<IShowGenreProps>();

const genreStore = useGenreStore();
const { showAllGenres } = storeToRefs(genreStore);

const showDivider = computed(() => showAllGenres.value);
const config = getGenreConfig(props.genre);
const iconName = computed((): string => `pi pi-${config.icon}`);
const genreColor = computed((): string => config.color);
</script>

<template>
  <Divider v-if="showDivider" type="solid" align="left" class="tv-show-divider">
    <div class="tv-show-genre-divider">
      <i :class="iconName" style="font-size: 1rem" :style="{ color: genreColor }" />
      <span>{{ config.label }}</span>
    </div>
  </Divider>
</template>

<style lang="scss" scoped>
@use '@/assets/theme' as *;

.tv-show-divider {
  :deep(.p-divider-content) {
    background: transparent;
    padding: 0 0.75rem;
  }

  :deep(.p-divider::before) {
    border-top-style: solid !important;
    opacity: 0.25;
  }
}

.tv-show-genre-divider {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: $font-playful;
  text-shadow: $font-text-shadow-playful;
  color: $color-lilac-dark;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}
</style>
