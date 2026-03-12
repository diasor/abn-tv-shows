<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import ShowsTile from '@/components/show-list/ShowsTile.vue';
import { useShowsStore } from '@/stores/useShowsStore';

const showsStore = useShowsStore();
const router = useRouter();

const goToShowDetails = (id: string | number) => {
  router.push(`/show/${id}`);
};

onMounted(() => {
  showsStore.fetchShows();
});
</script>

<template>
  <Card class="dashboard-card">
    <template #title>
      <h1>TV Shows Dashboard</h1>
    </template>
    <template #content>
      <div v-for="group in showsStore.showsByGenre" :key="group.genre" class="genre-section">
        <Divider type="dashed" align="left" class="tv-show-divider">
          <h2 class="genre-heading">{{ group.genre }}</h2>
        </Divider>
        <div class="shows-list">
          <div v-for="show in group.shows" :key="show.id" class="show-item">
            <ShowsTile :tvShow="show" @click.prevent="goToShowDetails(show.id)" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.dashboard-card {
  border-radius: 12px;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}

.genre-section {
  padding: 0 2rem 1.5rem;
}

.tv-show-divider {
  margin: 1rem 0;
  color: $color-lilac-dark;
  background-color: transparent;

  :deep(.p-divider-content) {
    background-color: transparent;
  }
}

.genre-heading {
  //   padding: 1rem 0 0;
  text-align: left;
  background-color: #fffff;
}

.shows-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.5fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.show-item {
  width: 100%;
}

/* 3 columns on large screens */
@media (min-width: 1200px) {
  .shows-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 2 columns on medium screens */
@media (min-width: 900px) and (max-width: 1199px) {
  .shows-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on small screens */
@media (max-width: 899px) {
  .shows-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
