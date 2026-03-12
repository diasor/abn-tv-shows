<script setup lang="ts">
import { computed } from 'vue';
import ScrollPanel from 'primevue/scrollpanel';

interface IShowSummaryProps {
  summary: string;
}
const props = defineProps<IShowSummaryProps>();

const formattedSummary = computed(() => {
  if (!props.summary) {
    return 'This show does not have a summary available.';
  }
  // Remove <p> tags if present
  return props.summary.replace(/<\/?p[^>]*>/g, '');
});
</script>

<template>
  <div class="tv-show-summary">
    <h3 class="label">Summary:</h3>
    <ScrollPanel
      style="width: 100%; height: 100px"
      :dt="{
        bar: {
          background: '#7a5aa6',
        },
      }"
    >
      <p>{{ formattedSummary }}</p>
    </ScrollPanel>
  </div>
</template>

<style scoped lang="scss">
.tv-show-summary {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 1rem;
}
</style>
