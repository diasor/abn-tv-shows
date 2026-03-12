<script setup lang="ts">
import { computed } from 'vue';
import Badge from 'primevue/badge';

interface IShowGenresProps {
  genres?: string[];
}
const props = defineProps<IShowGenresProps>();

/* Formats the genres to show a maximum of 3 genres.
 * If there are more than 3, it will show only the first 3 genres.
 * If there are no genres, it will return an empty array.
 */
const formattedGenres = computed(
  () => props.genres?.slice(0, 2) || [], // Show max 2 genres
);

/* Returns true if there are genres to display.
 * If there are no genres, it returns false.
 */
const showGenres = computed((): boolean =>
  !props.genres || props.genres.length === 0 ? false : true,
);
</script>

<template>
  <div v-if="showGenres" class="tv-show-genres-section">
    <span class="tv-show-label tv-show-genres-span">Genres:</span>
    <div class="tv-show-genres-list flex flex-wrap">
      <Badge
        v-for="genre in formattedGenres"
        :key="genre"
        :value="genre"
        severity="info"
        class="tv-show-genre-badge"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-genres-section {
  display: flex;
  width: 100%;
}

.tv-show-genres-span {
  margin-right: 0;
  flex-shrink: 0;
}

.tv-show-genres-list {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 0.5rem;
  justify-content: flex-start;
}

.tv-show-genre-badge {
  font-size: 0.8rem;
  font-weight: 700 !important;
  padding: 0.2rem 0.4rem;
  margin: auto 0.2rem;
  background-color: $color-lilac-darker;
  color: $vt-c-white;
}

/* Responsive design */
@media (max-width: 480px) {
  .tv-show-genres-list {
    flex-direction: column;
    align-items: flex-start;
  }

  .tv-show-genre-badge {
    align-self: flex-start;
  }
}
</style>
