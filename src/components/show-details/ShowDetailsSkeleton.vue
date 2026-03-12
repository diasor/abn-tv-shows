<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import BaseShowData from '@/components/base/BaseShowData.vue';
</script>

<template>
  <div class="tv-show-layout">
    <div class="tv-show-image-section">
      <!-- Image section -->
      <Skeleton width="100%" height="100%" class="tv-show-image-skeleton" />
    </div>

    <div class="tv-show-row">
      <!-- Summary section -->
      <div class="tv-show-column">
        <h3>Summary:</h3>
        <Skeleton width="100%" height="4rem" class="tv-show-skeleton" />
      </div>
    </div>

    <div class="tv-show-row">
      <!-- Detailed show information section -->
      <div class="tv-show-column">
        <h3>Details:</h3>
        <BaseShowData label="Language" :showSkeleton="true" />
        <BaseShowData label="Premiered" :showSkeleton="true" />
        <BaseShowData label="Type" :showSkeleton="true" />
        <BaseShowData label="Scheduled" :showSkeleton="true" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.tv-show-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
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

.tv-show-skeleton {
  width: 100%;
  margin: 0;
}

.tv-show-image-skeleton {
  flex: 1;
  min-height: 100%;
}
</style>
