import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TVShowEpisode, TVShowEpisodes } from '@/schemas/episodes';
import { fetchClient } from '@/shared/api/fetchClient';
import { API_SHOWS_BASE } from '@/shared/api/constants';

export const useShowEpisodesStore = defineStore('showEpisodes', () => {
  /**
   * Indicates whether the current tv show episodes are currently being loaded.
   * It controls the skeleton for the main dashboard.
   */
  const areEpisodesLoading = ref(false);

  /**
   * Stores the details of the current TV show episodes.
   * It is updated when fetching the details of a specific show's episodes.
   */
  const showEpisodes = ref<TVShowEpisodes>([] as TVShowEpisodes);

  /**
   * Returns the current selected TV show episodes.
   */
  const selectedShowEpisodes = computed((): TVShowEpisodes => showEpisodes.value);

  /**
   * Resets the selected TV show episodes.
   */
  const resetShowEpisodes = (): void => {
    showEpisodes.value = [] as TVShowEpisodes;
  };

  /**
   * Fetches the episodes of a TV show by the show ID
   * and updates the state accordingly.
   * @param id - The ID of the TV show to fetch episodes for.
   */
  const fetchShowEpisodes = async (id: string): Promise<void> => {
    areEpisodesLoading.value = true;
    try {
      const response = await fetchClient(`${API_SHOWS_BASE}/shows/${id}/episodes`);
      showEpisodes.value = response as TVShowEpisodes;
    } catch (error) {
      showEpisodes.value = [] as TVShowEpisodes;
    } finally {
      areEpisodesLoading.value = false;
    }
  };

  return {
    selectedShowEpisodes,
    fetchShowEpisodes,
    resetShowEpisodes,
    areEpisodesLoading,
  };
});
