<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IDataProps {
  label: string;
  value?: string;
  dataTestId?: string;
  showSkeleton?: boolean;
}
const props = defineProps<IDataProps>();
</script>

<template>
  <div class="tv-show-information-row">
    <span class="tv-show-label">{{ props.label }}:</span>
    <Skeleton v-if="props.showSkeleton" width="100%" height="1rem" />
    <span v-else class="tv-show-value" :data-testid="props.dataTestId">
      {{ props.value || NOT_AVAILABLE }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-information-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25rem 0;
  min-height: 2rem;
}
</style>
