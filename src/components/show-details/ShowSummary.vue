<script setup lang="ts">
import { computed } from 'vue';
import ScrollPanel from 'primevue/scrollpanel';

interface IShowSummaryProps {
  summary: string;
}
const props = defineProps<IShowSummaryProps>();

/* Formats the summary text by removing any HTML tags and providing
 * a default message if no summary is available.
 */
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
    <h3>Summary</h3>
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
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 1rem;
}
</style>
