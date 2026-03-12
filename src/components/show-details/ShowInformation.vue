<script setup lang="ts">
import { computed } from 'vue';
import type { TVShowDetails, TVShowSchedule } from '@/schemas/Shows';
import ShowRating from '@/components/show-details/ShowRating.vue';
import ShowGenres from '@/components/show-details/ShowGenres.vue';
import ShowOfficialSite from '@/components/show-details/ShowOfficialSite.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IShowInfoProps {
  tvShow: TVShowDetails;
}
const props = defineProps<IShowInfoProps>();

/** Formats the TV show premiered date into a human-readable string.
 * If the premiered date is not available, returns 'N/A'.
 * */
const formattedPremiered = computed(() => {
  if (!props.tvShow.premiered) return NOT_AVAILABLE;
  const date = new Date(props.tvShow.premiered);
  if (isNaN(date.getTime())) return NOT_AVAILABLE;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
});

/**
 * Formats the TV show schedule into a human-readable string.
 * If the schedule is not available, returns 'N/A'.
 */
const formattedScheduled = computed(() => {
  if (!props.tvShow.schedule) return NOT_AVAILABLE;
  const schedule: TVShowSchedule = props.tvShow.schedule;
  return `${schedule.days.join(', ')} at ${schedule.time}`;
});
</script>

<template>
  <div class="tv-show-info">
    <h3 class="label">Details</h3>
    <div class="tv-show-information-grid">
      <div class="tv-show-information-column">
        <BaseShowData label="Language" :value="props.tvShow.language" dataTestId="show-language" />
        <BaseShowData label="Premiered" :value="formattedPremiered" dataTestId="show-premiered" />
        <BaseShowData label="Type" :value="props.tvShow.type" dataTestId="show-type" />
        <BaseShowData label="Scheduled" :value="formattedScheduled" dataTestId="show-scheduled" />
      </div>

      <div class="tv-show-information-column">
        <div class="tv-show-information-row">
          <ShowOfficialSite :linkName="props.tvShow.name" :linkRef="props.tvShow.officialSite" />
        </div>
        <BaseShowData label="Status" :value="props.tvShow.status" dataTestId="show-status" />

        <div class="tv-show-information-row">
          <ShowRating :rating="props.tvShow.rating" />
        </div>

        <div class="tv-show-information-row">
          <ShowGenres :genres="props.tvShow.genres" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
}

.tv-show-information-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
}

.tv-show-information-column {
  display: flex;
  flex-direction: column;
}

.tv-show-information-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25rem 0;
  min-height: 2rem;
}
</style>
