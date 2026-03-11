<script setup lang="ts">
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Rating from 'primevue/rating';
import { computed } from 'vue';

interface IShowProps {
  name: string;
  language?: string;
  genres?: string[];
  premiered?: string;
  rating: {
    average: number;
  };
  image?: {
    medium: string;
  };
}

const props = defineProps<IShowProps>();

const formattedRating = computed(() =>
  props.rating?.average ? `${props.rating.average}/10` : 'N/A',
);

const formattedGenres = computed(
  () => props.genres?.slice(0, 3) || [], // Show max 3 genres
);

const formattedPremiered = computed(() => {
  if (!props.premiered) return 'N/A';
  const date = new Date(props.premiered);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
});
</script>

<template>
  <Card class="show-tile flex">
    <template #title>
      <h2 class="show-title">{{ props.name }}</h2>
    </template>

    <template #content>
      <!-- Image section -->
      <div class="show-content flex">
        <img
          v-if="props.image?.medium"
          :src="props.image.medium"
          :alt="props.name"
          class="show-image"
        />

        <!-- Language section -->
        <div class="show-info flex flex-column">
          <div class="info-row">
            <span class="label">Language:</span>
            <span class="value" data-testid="show-language">{{ props.language || 'N/A' }}</span>
          </div>

          <!-- Premiered section -->
          <div class="info-row">
            <span class="label">Premiered:</span>
            <span class="value" data-testid="show-premiered">{{ formattedPremiered }}</span>
          </div>

          <!-- Rating section -->
          <div class="info-row">
            <span class="label">Rating:</span>
            <Badge :value="formattedRating" severity="success" class="rating-badge" />
            <Rating
              :modelValue="Math.round((props.rating?.average || 0) / 2)"
              :readonly="true"
              :cancel="false"
              :stars="5"
              class="rating-badge"
            />
          </div>

          <!-- Genres section -->
          <div class="genres-section flex flex-column" v-if="formattedGenres.length">
            <span class="label">Genres:</span>
            <div class="genres-list flex flex-wrap">
              <Badge
                v-for="genre in formattedGenres"
                :key="genre"
                :value="genre"
                severity="info"
                class="genre-badge"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.show-tile {
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  transition: $playful-transition;
}

.show-tile:hover {
  transform: translateY(-10px);
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  cursor: pointer;
}

.show-content {
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.show-title {
  font-family: $font-playful;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
  color: $color-lilac-dark;
  text-shadow: $font-text-shadow-playful;
  line-height: 1.3;
}

.show-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
}

.show-info {
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.label {
  font-weight: 500;
  color: $color-lilac-dark;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.9rem;
}

.rating-badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
}

.genres-section {
  gap: 0.5rem;
}

.genres-list {
  gap: 0.5rem;
}

.genre-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  margin: auto 0.2rem;
  background-color: $color-lilac-darker;
}

/* Responsive design */
@media (max-width: 1200px) {
  .show-content {
    min-width: 0;
  }

  .show-tile {
    max-width: 100%;
    overflow: hidden;
  }

  .show-image {
    max-height: 220px;
  }
}

@media (max-width: 768px) {
  .show-title {
    font-size: 1.1rem;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .genres-list {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .show-tile {
    margin: 0.5rem;
  }

  .show-title {
    font-size: 1rem;
  }

  .genres-list {
    flex-direction: column;
    align-items: flex-start;
  }

  .genre-badge {
    align-self: flex-start;
  }
}
</style>
