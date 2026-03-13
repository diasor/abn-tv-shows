<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import ShowsTile from '@/components/show-list/ShowsTile.vue';
import ShowsTileSkeleton from '@/components/show-list/ShowsTileSkeleton.vue';
import ShowsGenreDivider from '@/components/show-list/ShowsGenreDivider.vue';
import GenreSelector from '@/components/show-list/GenreSelector.vue';
import ShowsPagination from '@/components/show-list/ShowsPagination.vue';
import { useShowsStore } from '@/stores/useShowsStore';

const showsStore = useShowsStore();
const { showsByGenre, isLoading } = storeToRefs(showsStore);
const router = useRouter();

const goToShowDetails = (id: string | number) => {
  router.push(`/show/${id}`);
};

const formattedTitle = computed((): string =>
  isLoading.value ? 'TV Shows Dashboard loading...' : 'TV Shows Dashboard',
);
</script>

<template>
  <Card class="tv-shows-dashboard">
    <template #title>
      <h1>{{ formattedTitle }}</h1>
    </template>
    <template #content>
      <div v-if="isLoading">
        <ShowsTileSkeleton />
      </div>
      <div v-else>
        <div class="tv-shows-controls">
          <GenreSelector />
          <ShowsPagination />
        </div>
        <div v-for="group in showsByGenre" :key="group.genre" class="genre-section">
          <ShowsGenreDivider :genre="group.genre" />
          <div class="tv-shows-list">
            <div v-for="show in group.shows" :key="show.id" class="tv-show-item">
              <ShowsTile :tvShow="show" @click.prevent="goToShowDetails(show.id)" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-shows-dashboard {
  border-radius: 12px;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}

.tv-shows-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.genre-section {
  padding: 0 2rem 1.5rem;
}

.tv-shows-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.5fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.tv-show-item {
  width: 100%;
}

/* 3 columns on large screens */
@media (min-width: 1200px) {
  .tv-shows-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 2 columns on medium screens */
@media (min-width: 900px) and (max-width: 1199px) {
  .tv-shows-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on small screens */
@media (max-width: 899px) {
  .tv-shows-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
