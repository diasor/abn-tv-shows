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

  const fetchShowDetails = async (id: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetchClient(`${API_SHOWS_BASE}/shows/${id}`);
      showDetails.value = response as TVShowDetails;
      console.log('fetching details', showDetails.value);
      await sleep(2000);
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
