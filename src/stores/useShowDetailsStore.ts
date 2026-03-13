import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TVShowDetails } from '@/schemas/shows';
import { fetchClient } from '@/shared/api/fetchClient';
import { API_SHOWS_BASE } from '@/shared/api/constants';

export const useShowDetailsStore = defineStore('showDetails', () => {
  /**
   * Indicates whether the current tv show is currently being loaded.
   * It controls the skeleton for the main dashboard.
   */
  const isLoading = ref(false);

  /**
   * Stores the details of the current TV show.
   * It is updated when fetching the details of a specific show.
   */
  const showDetails = ref<TVShowDetails>({} as TVShowDetails);

  /**
   * Returns the current selected TV show.
   */
  const selectedShow = computed(() => showDetails.value);

  /**
   * Resets the selected tv show.
   */
  const resetShowDetails = () => {
    showDetails.value = {} as TVShowDetails;
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Fetches the details of a TV show by its ID and
   * updates the state accordingly.
   * @param id - The ID of the TV show to fetch details for.
   */
  const fetchShowDetails = async (id: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetchClient(`${API_SHOWS_BASE}/shows/${id}`);
      await sleep(4000); // this is only to show the skeleton
      showDetails.value = response as TVShowDetails;
    } catch (error) {
      showDetails.value = {} as TVShowDetails;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    selectedShow,
    fetchShowDetails,
    resetShowDetails,
    isLoading,
  };
});
