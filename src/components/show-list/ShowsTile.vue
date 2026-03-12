<script setup lang="ts">
import { computed } from 'vue';
import Card from 'primevue/card';
import ShowGenres from '@/components/show-details/ShowGenres.vue';
import ShowImage from '@/components/show-details/ShowImage.vue';
import ShowRating from '@/components/show-details/ShowRating.vue';
import type { TVShowImage, TVShowRating } from '@/schemas/Shows';

interface IShowProps {
  name: string;
  language?: string;
  genres?: string[];
  premiered?: string;
  rating: TVShowRating;
  image?: TVShowImage;
}
const props = defineProps<IShowProps>();

const formattedPremiered = computed(() => {
  if (!props.premiered) return 'N/A';
  const date = new Date(props.premiered);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
});
</script>

<template>
  <Card class="tv-show-tile">
    <template #title>
      <h2>{{ props.name }}</h2>
    </template>

    <template #content>
      <div class="tv-show-content">
        <!-- Image section -->
        <ShowImage :image="props.image" :alt="props.name" :showPreview="false" />

        <div>
          <!-- Language section -->
          <div class="show-information-row">
            <span class="label">Language:</span>
            <span class="value" data-testid="show-language">
              {{ props.language || 'N/A' }}
            </span>
          </div>

          <!-- Premiered section -->
          <div class="show-information-row">
            <span class="label">Premiered:</span>
            <span class="value" data-testid="show-premiered">
              {{ formattedPremiered }}
            </span>
          </div>

          <!-- Rating section -->
          <div class="show-information-row">
            <ShowRating :rating="props.rating" />
          </div>

          <!-- Genres section -->
          <div class="show-information-row">
            <ShowGenres :genres="props.genres" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-tile {
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  transition: $playful-transition;
}

.tv-show-tile:hover {
  transform: translateY(-10px);
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  cursor: pointer;
}

.tv-show-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.show-information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.25rem 0;
}

/* Responsive design */
@media (max-width: 1200px) {
  .tv-show-content {
    min-width: 0;
  }

  .tv-show-tile {
    max-width: 100%;
    overflow: hidden;
  }
}

@media (max-width: 768px) {
  .tv-show-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
