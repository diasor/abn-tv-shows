<script setup lang="ts">
import Card from 'primevue/card';
import Badge from 'primevue/badge';
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
  <Card class="show-tile">
    <template #title>
      <h2 class="show-title">{{ props.name }}</h2>
    </template>

    <template #content>
      <div class="show-content">
        <img
          v-if="props.image?.medium"
          :src="props.image.medium"
          :alt="props.name"
          class="show-image"
        />

        <div class="show-info">
          <div class="info-row">
            <span class="label">Language:</span>
            <span class="value" data-testid="show-language">{{ props.language || 'N/A' }}</span>
          </div>

          <div class="info-row">
            <span class="label">Premiered:</span>
            <span class="value" data-testid="show-premiered">{{ formattedPremiered }}</span>
          </div>

          <div class="info-row">
            <span class="label">Rating:</span>
            <Badge :value="formattedRating" severity="success" class="rating-badge" />
          </div>

          <div class="genres-section" v-if="formattedGenres.length">
            <span class="label">Genres:</span>
            <div class="genres-list">
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

.show-tile {
  position: relative;
  display: inline-block;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background:
    linear-gradient(180deg, #ffffff 0%, #f3eefb 100%) padding-box,
    linear-gradient(145deg, #9f86bd 0%, #6f4d95 45%, #4a335f 100%) border-box;
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.9),
    /* top edge highlight */ inset 0 -3px 6px rgba(58, 39, 76, 0.28),
    /* bottom inner depth */ inset 2px 0 3px rgba(255, 255, 255, 0.28),
    /* left bevel */ inset -2px 0 4px rgba(58, 39, 76, 0.2),
    /* right bevel */ 0 10px 20px rgba(58, 39, 76, 0.28),
    /* outer shadow */ 0 2px 4px rgba(58, 39, 76, 0.2);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.show-tile:hover {
  transform: translateY(-10px);
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

.show-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 270px;
}

.show-title {
  font-size: 1.25rem;
  font-weight: 500;
  font-family: 'Fredoka One', cursive;
  margin: 0;
  color: #5b3f73; /* dark lilac */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
}

.show-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
}

.show-info {
  display: flex;
  flex-direction: column;
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
  color: var(--text-color-secondary);
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
}

/* Responsive design */
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
