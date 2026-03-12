import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TVShow } from '@/schemas/Shows';
import { fetchClient } from '@/shared/api/fetchClient';
import { API_SHOWS_BASE, DEFAULT_SHOWS_LIMIT } from '@/shared/api/constants';

export const useShowsStore = defineStore('shows', () => {
  const selectedGenre = ref('All');
  const isLoading = ref(false);
  const shows = ref<TVShow[]>([]);
  const visibleShows = computed(() => {
    if (selectedGenre.value === 'All') {
      return shows.value;
    }
    return shows.value.filter((show) => show.genres.includes(selectedGenre.value));
  });

  const fetchShows = async (page: number = 1): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetchClient(
        `${API_SHOWS_BASE}/shows?&page=${page}&limit=${DEFAULT_SHOWS_LIMIT}`,
      );
      shows.value = response as TVShow[];
    } catch (error) {
      shows.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const getShowsByGenre = async (page: number = 1): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetchClient(
        `${API_SHOWS_BASE}/shows?page=${selectedGenre.value}&page=${page}&limit=${DEFAULT_SHOWS_LIMIT}`,
      );
      shows.value = response as TVShow[];
    } catch (error) {
      shows.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    visibleShows,
    selectedGenre,
    fetchShows,
    getShowsByGenre,
    isLoading,
  };
});
