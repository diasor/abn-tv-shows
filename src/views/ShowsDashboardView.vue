<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import ShowsTile from '@/components/show-list/ShowsTile.vue';
import { useShowsStore } from '@/stores/useShowsStore';

const showsStore = useShowsStore();
const router = useRouter();

const goToShowDetails = (id: string | number) => {
  console.log('Navigating to show details for ID:', id);
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
      <div class="shows-list">
        <div v-for="show in showsStore.visibleShows" :key="show.id" class="show-item">
          <ShowsTile
            :name="show.name"
            :language="show.language"
            :genres="show.genres"
            :premiered="show.premiered"
            :rating="show.rating"
            :image="show.image"
            @click.prevent="goToShowDetails(show.id)"
          />
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
