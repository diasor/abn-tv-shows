<script setup lang="ts">
import { computed } from 'vue';
import Badge from 'primevue/badge';
import Rating from 'primevue/rating';
import type { TVShowRating } from '@/schemas/Shows';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IShowRatingProps {
  rating: TVShowRating;
}
const props = defineProps<IShowRatingProps>();

const formattedRating = computed(() =>
  props.rating?.average ? `${props.rating.average}/10` : NOT_AVAILABLE,
);
</script>

<template>
  <span class="tv-show-label">Rating:</span>
  <div class="tv-show-container">
    <Badge :value="formattedRating" severity="success" class="tv-show-rating-badge" />
    <Rating
      :modelValue="Math.round((props.rating?.average || 0) / 2)"
      :readonly="true"
      :cancel="false"
      :stars="5"
      class="tv-show-rating-stars"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-rating-span {
  margin-right: 1.5rem;
}

.tv-show-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  min-width: 0;
  flex-wrap: wrap;
}

.tv-show-rating-badge {
  font-size: 0.8rem;
  font-weight: 700 !important;
  background-color: $color-golden-darker;
}

.tv-show-rating-stars {
  flex-shrink: 0;
}

.tv-show-rating-stars :deep(.p-rating-option .p-rating-icon) {
  color: $color-golden;
}

.tv-show-rating-stars :deep(.p-rating-option-active .p-rating-icon) {
  color: $color-golden-darker;
}

@media (max-width: 760px) {
  .tv-show-container {
    row-gap: 0.25rem;
  }

  .tv-show-rating-stars :deep(.p-rating-icon) {
    width: 0.85rem;
    height: 0.85rem;
  }
}
</style>
