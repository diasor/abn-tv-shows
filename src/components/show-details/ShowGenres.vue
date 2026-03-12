<script setup lang="ts">
import { computed } from 'vue';
import Badge from 'primevue/badge';

interface IShowGenresProps {
  genres?: string[];
}
const props = defineProps<IShowGenresProps>();

const formattedGenres = computed(
  () => props.genres?.slice(0, 3) || [], // Show max 3 genres
);

const showGenres = computed((): boolean =>
  !props.genres || props.genres.length === 0 ? false : true,
);
</script>

<template>
  <div v-if="showGenres" class="genres-section">
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
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.genres-section {
  display: flex;
  width: 100%;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 0.5rem;
  justify-content: flex-end;
}

.genre-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  margin: auto 0.2rem;
  background-color: $color-lilac-darker;
  color: $vt-c-white;
}

/* Responsive design */
@media (max-width: 480px) {
  .genres-list {
    flex-direction: column;
    align-items: flex-start;
  }

  .genre-badge {
    align-self: flex-start;
  }
}
</style>
