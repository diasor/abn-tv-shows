import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import type { TVShow } from '@/schemas/shows';
import { Genre } from '@/schemas/genres';
import { fetchClient } from '@/shared/api/fetchClient';
import { useGenreStore } from '@/stores/useGenreStore';
import { usePaginationStore } from '@/stores/usePaginationStore';
import { useShowDetailsStore } from '@/stores/useShowDetailsStore';
import { API_SHOWS_BASE } from '@/shared/api/constants';
import { sleep } from '@/shared/utilities';

export const useShowsStore = defineStore('shows', () => {
  /**
   * Genre store is needed to trigger the fetch shows API endpoint
   * and to filter shows by the selected genre.
   */
  const genreStore = useGenreStore();
  const { selectedGenre, showAllGenres } = storeToRefs(genreStore);

  /**
   * Pagination store is needed to trigger the fetch shows API endpoint
   * with the correct page number
   */
  const pagination = usePaginationStore();
  const { setTotalRecords } = pagination;

  /**
   * TV Show Details' store.
   */
  const detailStore = useShowDetailsStore();
  const { resetShowDetails } = detailStore;

  /**
   * Indicates whether the tv shows are currently being loaded.
   * It controls the skeleton for the main dashboard.
   */
  const isLoading = ref(false);

  /**
   * Stores all shows returned by the fetch API.
   */
  const allShows = ref<TVShow[]>([]);

  /**
   * Stores all filtered visible shows.
   * If showAllGenres is true, it returns all shows.
   * Otherwise, it filters shows by the selected genre.
   */
  const filteredShows = computed((): TVShow[] => {
    if (showAllGenres.value) {
      return allShows.value;
    }
    return allShows.value.filter((show) => show.genres?.includes(selectedGenre.value as Genre));
  });

  /**
   * Calculates the amount of all filtered visible shows.
   * Uses filteredShows (pre-pagination) to return the correct total for the paginator.
   */
  const totalFilteredShows = computed(() => filteredShows.value.length);

  /**
   * Slices filteredShows to the current page.
   */
  const pagedShows = computed(() => {
    const start = pagination.page * pagination.rows;
    return filteredShows.value.slice(start, start + pagination.rows);
  });

  /**
   * Groups shows by genre and sorts each group by rating (descending).
   * Genres are sorted alphabetically.
   */
  const showsByGenre = computed((): { genre: Genre; shows: TVShow[] }[] => {
    const isAllGenres = showAllGenres.value;
    const genreMap = new Map<Genre, TVShow[]>();
    for (const show of pagedShows.value) {
      const genres = isAllGenres
        ? show.genres?.length
          ? show.genres
          : [Genre.UNKNOWN]
        : [selectedGenre.value as Genre];
      for (const genre of genres) {
        if (!genreMap.has(genre)) genreMap.set(genre, []);
        if (genre === Genre.UNKNOWN || show.genres?.includes(genre as Genre)) {
          genreMap.get(genre)!.push(show);
        }
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
  const fetchShows = async (): Promise<void> => {
    isLoading.value = true;
    // reset the selected show to avoid inconsistencies
    resetShowDetails();
    try {
      const response = await fetchClient(`${API_SHOWS_BASE}/shows`);
      await sleep(3000); // this is only to show the skeleton
      allShows.value = response as TVShow[];
      setTotalRecords(totalFilteredShows.value);
    } catch (error) {
      allShows.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Watches for changes in the pagination page and rows,
   * and triggers the fetchShows function accordingly.
   * Fetches all shows ONCE on store init, and whenever page/rows change.
   * The immediate option is set to true to fetch shows
   * on the initial load of the app.
   */
  watch(
    [() => pagination.page, () => pagination.rows],
    ([newPage, newRows], [oldPage, oldRows]) => {
      if (newPage !== oldPage || newRows !== oldRows) {
        fetchShows();
      }
    },
    { immediate: true },
  );

  /**
   * Watches for changes in the selected genre, and resets
   * pagination with the correct total for that genre.
   */
  watch(selectedGenre, () => {
    pagination.resetPagination(totalFilteredShows.value);
  });

  return {
    allShows,
    filteredShows,
    pagedShows,
    totalFilteredShows,
    showsByGenre,
    selectedGenre,
    fetchShows,
    isLoading,
  };
});
