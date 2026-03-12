<script setup lang="ts">
import { computed } from 'vue';
import Card from 'primevue/card';
import ShowImage from '@/components/show-details/ShowImage.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';
import ShowRating from '@/components/show-details/ShowRating.vue';
import ShowGenres from '@/components/show-details/ShowGenres.vue';
import type { TVShow } from '@/schemas/Shows';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IShowProps {
  tvShow: TVShow;
}
const props = defineProps<IShowProps>();

/** Formats the TV show premiered date into a human-readable string.
 * If the premiered date is not available, returns 'N/A'.
 * */
const formattedPremiered = computed(() => {
  if (!props.tvShow.premiered) return NOT_AVAILABLE;
  const date = new Date(props.tvShow.premiered);
  if (isNaN(date.getTime())) return NOT_AVAILABLE;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
});
</script>

<template>
  <Card class="tv-show-tile">
    <template #title>
      <h2>{{ props.tvShow.name }}</h2>
    </template>

    <template #content>
      <div class="tv-show-content">
        <!-- Image section -->
        <ShowImage :image="props.tvShow.image" :alt="props.tvShow.name" :showPreview="false" />

        <div>
          <div class="tv-show-information-row">
            <BaseShowData
              label="Language"
              :value="props.tvShow.language"
              dataTestId="show-language"
            />
          </div>
          <div class="tv-show-information-row">
            <BaseShowData
              label="Premiered"
              :value="formattedPremiered"
              dataTestId="show-premiered"
            />
          </div>

          <!-- Rating section -->
          <div class="tv-show-information-row">
            <ShowRating :rating="props.tvShow.rating" />
          </div>

          <!-- Genres section -->
          <div class="tv-show-information-row">
            <ShowGenres :genres="props.tvShow.genres" />
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

.tv-show-information-row {
  display: flex;
  justify-content: flex-start;
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
