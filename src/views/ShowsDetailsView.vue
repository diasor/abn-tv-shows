<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Card from 'primevue/card';
import ShowTabs from '@/components/show-details/ShowTabs.vue';
import ShowDetailsMain from '@/components/show-details/ShowDetailsMain.vue';
import { useShowDetailsStore } from '@/stores/useShowDetailsStore';

interface IShowDetailsProps {
  id: string;
}
const props = defineProps<IShowDetailsProps>();

const showDetailsStore = useShowDetailsStore();
const { selectedShow, isLoading } = storeToRefs(showDetailsStore);
const { fetchShowDetails } = showDetailsStore;

onMounted(async () => {
  await fetchShowDetails(props.id);
});

/** Formats the title for the TV show details page.
 * If the selected show is not available or does not have a name, returns a default title.
 * Otherwise, returns the show's name followed by "details".
 */
const formattedTitle = computed((): string => {
  if (!selectedShow.value || !selectedShow.value.name) return 'TV show details loading...';
  return `${selectedShow.value.name}'s details`;
});

const tabSelected = ref('0');
</script>

<template>
  <Card class="show-details-card">
    <template #title>
      <h1>{{ formattedTitle }}</h1>
    </template>
    <template #content>
      <ShowTabs :tabSelected="tabSelected">
        <template #main>
          <ShowDetailsMain :tvShow="selectedShow" :isLoading="isLoading" />
        </template>
        <template #episodes>
          <p>Episodes content goes here...</p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </template>
        <template #photos>
          <p>Episodes photos goes here...</p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </template>
      </ShowTabs>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.show-details-card {
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
