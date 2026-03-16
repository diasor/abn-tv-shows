<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Rating from 'primevue/rating';
import { FilterMatchMode } from '@primevue/core/api';
import { useShowEpisodesStore } from '@/stores/useShowEpisodesStore';

const { areEpisodesLoading, selectedShowEpisodes } = storeToRefs(useShowEpisodesStore());
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  number: { value: null, matchMode: FilterMatchMode.EQUALS },
  season: { value: null, matchMode: FilterMatchMode.EQUALS },
});
</script>

<template>
  <div class="tvshow-episode-list">
    <DataTable
      class="tvshow-episode-table"
      :value="selectedShowEpisodes"
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      :globalFilterFields="['number', 'season', 'name']"
      tableStyle="min-width: 50rem"
      :loading="areEpisodesLoading"
      scrollable
      paginator
      :rows="10"
    >
      <template #header>
        <div class="tvshow-episode-header flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Episodes</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
        <div class="tvshow-episode-search flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <Column field="number" header="Episode">
        <template #body="slotProps">
          {{ slotProps.data.number }}
        </template>
      </Column>
      <Column field="season" header="Season">
        <template #body="slotProps">
          {{ slotProps.data.season }}
        </template>
      </Column>
      <Column field="name" header="Name">
        <template #body="slotProps">
          {{ slotProps.data.name }}
        </template>
      </Column>
      <Column field="rating" header="Rating">
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.rating?.average"
            readonly
            class="tv-show-rating-stars"
          />
        </template>
      </Column>
      <Column field="airdate" header="Airdate">
        <template #body="slotProps">
          {{ slotProps.data.airdate }}
        </template>
      </Column>
      <Column field="airtime" header="Airtime">
        <template #body="slotProps">
          {{ slotProps.data.airtime }}
        </template>
      </Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image.medium"
            :alt="slotProps.data.name"
            class="tvshow-episode-image"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ selectedShowEpisodes ? selectedShowEpisodes.length : 0 }} episodes.
      </template>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tvshow-episode-list {
  margin: 1.5rem;
}

.tvshow-episode-table :deep(.p-datatable-wrapper) {
  overflow-x: auto;
}

.tvshow-episode-image {
  width: 12rem;
  border-radius: 0.5rem;
}

.tv-show-rating-stars :deep(.p-rating-option .p-rating-icon) {
  color: $color-golden;
}

.tv-show-rating-stars :deep(.p-rating-option-active .p-rating-icon) {
  color: $color-golden-darker;
}

@media (max-width: 768px) {
  .tvshow-episode-list {
    margin: 1rem;
  }

  .tvshow-episode-header {
    align-items: flex-start;
  }

  .tvshow-episode-search {
    justify-content: stretch;
  }

  .tvshow-episode-search :deep(.p-iconfield),
  .tvshow-episode-search :deep(.p-inputtext) {
    width: 100%;
  }

  .tvshow-episode-table :deep(.p-datatable-table) {
    min-width: 42rem;
  }

  .tvshow-episode-image {
    width: 7rem;
  }

  .tv-show-rating-stars :deep(.p-rating-option .p-rating-icon) {
    font-size: 0.9rem;
  }
}
</style>
