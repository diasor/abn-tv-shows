<script setup lang="ts">
import { computed } from 'vue';
import Badge from 'primevue/badge';
import Rating from 'primevue/rating';
import type { TVShowRating } from '@/schemas/Shows';

interface IShowRatingProps {
  rating: TVShowRating;
}
const props = defineProps<IShowRatingProps>();

const formattedRating = computed(() =>
  props.rating?.average ? `${props.rating.average}/10` : 'N/A',
);
</script>

<template>
  <span class="label">Rating:</span>
  <Badge :value="formattedRating" severity="success" class="rating-badge" />
  <Rating
    :modelValue="Math.round((props.rating?.average || 0) / 2)"
    :readonly="true"
    :cancel="false"
    :stars="5"
    class="rating-badge"
  />
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.rating-badge {
  font-size: 0.8rem;
}
</style>
