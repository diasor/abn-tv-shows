import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TVShowDetails } from '@/schemas/Shows';
import { fetchClient } from '@/shared/api/fetchClient';
import { API_SHOWS_BASE } from '@/shared/api/constants';

export const useShowDetailsStore = defineStore('showDetails', () => {
  const isLoading = ref(false);
  const showDetails = ref<TVShowDetails>({} as TVShowDetails);
  const selectedShow = computed(() => showDetails.value);

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
      showDetails.value = response as TVShowDetails;
      await sleep(4000); // this is only to show the skeleton
    } catch (error) {
      showDetails.value = {} as TVShowDetails;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    selectedShow,
    fetchShowDetails,
    isLoading,
  };
});
