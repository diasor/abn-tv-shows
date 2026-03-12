<script setup lang="ts">
import { computed } from 'vue';
import ShowDetailsSkeleton from '@/components/show-details/ShowDetailsSkeleton.vue';
import ShowImage from '@/components/show-details/ShowImage.vue';
import ShowSummary from '@/components/show-details/ShowSummary.vue';
import type { TVShowDetails, TVShowImage, TVShowRating } from '@/schemas/Shows';
import ShowInformation from './ShowInformation.vue';

interface IShowDetailsProps {
  tvShow: TVShowDetails;
  isLoading: boolean;
}
const props = defineProps<IShowDetailsProps>();
// const tvShowAvailable = computed(
//   (): boolean => props.tvShow.id !== undefined && props.tvShow.name !== undefined,
// );

const tvShowAvailable = computed((): boolean => props.isLoading && props.tvShow.id !== undefined);
</script>

<template>
  <div class="tv-show-details-card">
    <ShowDetailsSkeleton v-if="tvShowAvailable" />
    <div v-else class="tv-show-layout">
      <div class="tv-show-image">
        <!-- Image section -->
        <ShowImage :image="props.tvShow.image" :alt="props.tvShow.name" :showPreview="true" />
      </div>

      <div class="tv-show-row">
        <ShowSummary :summary="props.tvShow.summary" />
      </div>
      <div class="tv-show-row">
        <ShowInformation :tvShow="props.tvShow" />
      </div>
      <div class="tv-show-row">Row 3</div>
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
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  border-radius: 0.5rem;
}

/* Image spans the full left column */
.tv-show-image {
  grid-row: 1 / 4;
  grid-column: 1;
  border-radius: 12px;
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
    grid-template-rows: auto repeat(3, 150px);
  }

  .tv-show-image {
    grid-column: 1;
    grid-row: 1;
    height: 300px;
  }

  .tv-show-row {
    grid-column: 1;
  }
}
</style>
