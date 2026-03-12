import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TVShow } from '@/schemas/shows';
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

  /**
   * Groups visibleShows by genre and sorts each group by rating (descending).
   * Genres are sorted alphabetically.
   */
  const showsByGenre = computed((): { genre: string; shows: TVShow[] }[] => {
    const isAllGenres = selectedGenre.value === 'All';
    const genreMap = new Map<string, TVShow[]>();

    for (const show of visibleShows.value) {
      const genres = isAllGenres
        ? show.genres?.length
          ? show.genres
          : ['Unknown']
        : [selectedGenre.value];
      for (const genre of genres) {
        if (!genreMap.has(genre)) genreMap.set(genre, []);
        genreMap.get(genre)!.push(show);
      }
    }

    return [...genreMap.entries()]
      .map(([genre, genreShows]) => ({
        genre,
        shows: [...genreShows].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)),
      }))
      .sort((a, b) => a.genre.localeCompare(b.genre));
  });

  /**
   * Fetches the all available TV shows, paginating and
   * updates the state accordingly.
   * @param page - The page number to fetch.
   */
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
    showsByGenre,
    selectedGenre,
    fetchShows,
    getShowsByGenre,
    isLoading,
  };
});
