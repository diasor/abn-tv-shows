<script setup lang="ts">
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton';
import BaseShowData from '@/components/base/BaseShowData.vue';
</script>

<template>
  <div class="tv-shows-list">
    <Card class="tv-show-item" v-for="i in 3" :key="i">
      <template #title>
        <h2>Tv Show loading...</h2>
      </template>
      <template #content>
        <div class="tv-show-content">
          <!-- Image section -->
          <Skeleton width="100%" height="200px" />
          <div>
            <div class="tv-show-information-row">
              <BaseShowData label="Language" :showSkeleton="true" />
            </div>
            <div class="tv-show-information-row">
              <BaseShowData label="Premiered" :showSkeleton="true" />
            </div>
            <div class="tv-show-information-row">
              <BaseShowData label="Rating" :showSkeleton="true" />
            </div>
            <div class="tv-show-information-row">
              <BaseShowData label="Genre" :showSkeleton="true" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-shows-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.5fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.tv-show-item {
  width: 100%;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  transition: $playful-transition;
}

/* 3 columns on large screens */
@media (min-width: 1200px) {
  .tv-shows-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 2 columns on medium screens */
@media (min-width: 900px) and (max-width: 1199px) {
  .tv-shows-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on small screens */
@media (max-width: 899px) {
  .tv-shows-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.tv-show-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.tv-show-information-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding: 0.25rem 0;
}

/* Responsive design */
@media (max-width: 1200px) {
  .tv-show-content {
    min-width: 0;
  }

  .tv-show-tile {
    max-width: 100%;
    overflow: hidden;
  }
}

@media (max-width: 768px) {
  .tv-show-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
