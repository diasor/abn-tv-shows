<script setup lang="ts">
import { computed } from 'vue';
import { NOT_AVAILABLE } from '@/shared/api/constants';

interface IShowSiteProps {
  linkName: string;
  linkRef?: string | null;
}
const props = defineProps<IShowSiteProps>();

/**
 * Returns a boolean indicating whether the official site link is available and valid.
 * If the official site is not available, returns 'N/A'.
 */
const showOfficialSite = computed((): boolean =>
  !props.linkRef || props.linkRef.trim() === '' || props.linkRef === null ? false : true,
);

const linkToOfficialSite = computed((): string =>
  !props.linkRef || props.linkRef.trim() === '' || props.linkRef === null ? '' : props.linkRef,
);
</script>

<template>
  <span class="tv-show-label">Official site:</span>
  <a
    v-if="showOfficialSite"
    class="tv-show-value tv-show-link"
    :href="linkToOfficialSite"
    target="_blank"
    rel="noopener noreferrer"
    data-testid="show-official-site"
  >
    {{ props.linkName }}
  </a>
  <span v-else class="tv-show-value" data-testid="show-official-site">
    {{ NOT_AVAILABLE }}
  </span>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-link {
  text-decoration: underline;
  word-break: break-word;
}
</style>
