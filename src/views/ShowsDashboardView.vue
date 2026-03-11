<script setup lang="ts">
import { onMounted } from 'vue';
import Card from 'primevue/card';
import ShowsTile from '@/components/shows/ShowsTile.vue';
import { useShowsStore } from '@/stores/showsStore';

const showsStore = useShowsStore();

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
      <div class="shows-list">
        <div v-for="show in showsStore.visibleShows" :key="show.id" class="show-item">
          <ShowsTile
            :name="show.name"
            :language="show.language"
            :genres="show.genres"
            :premiered="show.premiered"
            :rating="show.rating"
            :image="show.image"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@import '@/assets/theme.scss';

.dashboard-card {
  border-radius: 12px;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}

h1 {
  font-size: 2.5rem;
  font-weight: 500;
  font-family: $font-playful;
  color: $color-lilac-dark;
  text-shadow: $font-text-shadow-playful;
  text-align: center;
  margin: 0 0 1.5rem 0;
}

.shows-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.5fr));
  gap: 1.5rem;
  width: 100%;
  padding: 2rem;
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
@media (min-width: 768px) and (max-width: 1199px) {
  .shows-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on small screens */
@media (max-width: 767px) {
  .shows-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
