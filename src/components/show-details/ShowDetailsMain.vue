<script setup lang="ts">
import { ref, watch } from 'vue';
import ShowDetailsSkeleton from '@/components/show-details/ShowDetailsSkeleton.vue';
import ShowImage from '@/components/show-details/ShowImage.vue';
import ShowSummary from '@/components/show-details/ShowSummary.vue';
import ShowInformation from './ShowInformation.vue';

import type { TVShowDetails } from '@/schemas/Shows';

interface IShowDetailsProps {
  tvShow: TVShowDetails;
  isLoading: boolean;
}
const props = defineProps<IShowDetailsProps>();

const tvShowSkeleton = ref(true);
watch(
  [() => props.isLoading, () => props.tvShow.id],
  ([isLoading, tvShowId]) => {
    tvShowSkeleton.value = isLoading || tvShowId === undefined;
  },
  { immediate: true },
);
</script>

<template>
  <div class="tv-show-details-card">
    <ShowDetailsSkeleton v-if="tvShowSkeleton" />
    <div v-else class="tv-show-layout">
      <div class="tv-show-image-section">
        <!-- Image section -->
        <ShowImage :image="props.tvShow.image" :alt="props.tvShow.name" :showPreview="true" />
      </div>

      <div class="tv-show-row">
        <!-- Summary section -->
        <ShowSummary :summary="props.tvShow.summary" />
      </div>
      <div class="tv-show-row">
        <!-- Detailed show information section -->
        <ShowInformation :tvShow="props.tvShow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-details-card {
  display: flex;
  flex: 1;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  border-radius: 0.5rem;
}

.tv-show-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  border-radius: 0.5rem;
}

/* Image spans the full left column */
.tv-show-image-section {
  grid-row: 1 / 3;
  grid-column: 1;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Right column rows */
.tv-show-row {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
}

/* Responsive: stack layout on smaller screens */
@media (max-width: 768px) {
  .tv-show-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-rows: auto;
  }

  .tv-show-image-section {
    grid-column: 1;
    grid-row: 1;
    height: auto;
  }

  .tv-show-row {
    grid-column: 1;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
