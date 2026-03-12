<script setup lang="ts">
import { computed } from 'vue';
import type { TVShowDetails } from '@/schemas/Shows';

interface IShowInfoProps {
  tvShow: TVShowDetails;
}
const props = defineProps<IShowInfoProps>();
</script>

<template>
  <div class="tv-show-info">
    <div class="tv-show-information-row">
      <span class="label">Language:</span>
      <span class="value" data-testid="show-language">
        {{ props.tvShow.language || 'N/A' }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/base' as *;

.tv-show-info {
  display: flex;
  flex-direction: column;
}

.tv-show-information-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.25rem 0;
}
</style>
