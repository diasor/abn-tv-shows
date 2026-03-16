<script setup lang="ts">
import { computed } from 'vue';
import Badge from 'primevue/badge';
import Rating from 'primevue/rating';
import type { TVShowRating } from '@/schemas/rating';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IShowRatingProps {
  rating: TVShowRating;
}
const props = defineProps<IShowRatingProps>();

/**
 * Checks whether there is a proper rating available.
 * It returns true if the average rating is not null, indicating that a rating exists for the show. If the average rating is null, it returns false, indicating that no rating is available.
 * */
const ratingAvailable = computed(() => props.rating?.average !== null);

/**
 * Transforms the API ratings from a scale of 0 to 10, to the
 * scale required by the PrimeVuew component: a scale of 0 to 5.
 * This computed divides the average rating by 2 to convert
 * it to the correct scale for the Rating component.
 */
const formattedRating = computed(() =>
  props.rating?.average ? `${props.rating.average}/10` : NOT_AVAILABLE,
);
</script>

<template>
  <span class="tv-show-label">Rating:</span>
  <div class="tv-show-container">
    <Badge :value="formattedRating" severity="success" class="tv-show-rating-badge" />
    <Rating
      v-if="ratingAvailable"
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
