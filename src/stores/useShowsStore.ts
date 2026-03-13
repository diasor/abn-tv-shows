import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import type { TVShow } from '@/schemas/shows';
import { Genre } from '@/schemas/genres';
import { fetchClient } from '@/shared/api/fetchClient';
import { API_SHOWS_BASE, DEFAULT_SHOWS_LIMIT } from '@/shared/api/constants';
import { useGenreStore } from '@/stores/useGenreStore';

export const useShowsStore = defineStore('shows', () => {
  /**
   * Genre store is needed to trigger the fetch shows API endpoint
   * and to filter shows by the selected genre.
   */
  const genreStore = useGenreStore();
  const { selectedGenre, showAllGenres } = storeToRefs(genreStore);

  /**
   * Indicates whether the tv shows are currently being loaded.
   * It controls the skeleton for the main dashboard.
   */
  const isLoading = ref(false);

  /**
   * Stores all shows returned by the fetch API.
   */
  const shows = ref<TVShow[]>([]);

  /**
   * Stores all visible shows.
   * If showAllGenres is true, it returns all shows.
   * Otherwise, it filters shows by the selected genre.
   */
  const visibleShows = computed(() => {
    if (showAllGenres.value) {
      return shows.value;
    }
    return shows.value.filter((show) => show.genres.includes(selectedGenre.value as Genre));
  });

  /**
   * Groups visibleShows by genre and sorts each group by rating (descending).
   * Genres are sorted alphabetically.
   */
  const showsByGenre = computed((): { genre: Genre; shows: TVShow[] }[] => {
    const isAllGenres = showAllGenres.value;
    const genreMap = new Map<Genre, TVShow[]>();

    for (const show of visibleShows.value) {
      const genres = isAllGenres
        ? show.genres?.length
          ? show.genres
          : [Genre.UNKNOWN]
        : [selectedGenre.value as Genre];
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

  return {
    visibleShows,
    showsByGenre,
    selectedGenre,
    fetchShows,
    isLoading,
  };
});
