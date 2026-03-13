import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Genre } from '@/schemas/genres';
import { usePaginationStore } from './usePaginationStore';

export const useGenreStore = defineStore('genre', () => {
  /**
   * Pagination store is needed to trigger the fetch shows API endpoint
   * whenever the selected genre changes.
   */
  const pagination = usePaginationStore();
  const { resetPagination } = pagination;

  /**
   * Stores the currently selected genre. Defaults to 'All' to show all genres when the app loads.
   */
  const selectedGenre = ref<Genre>(Genre.ALL);

  /**
   * Determines if there is a currently selected genre, or if the default
   * "ALL" is selected, which means all genres should be shown.
   * This is used to conditionally render UI elements based on the selected genre.
   */
  const showAllGenres = computed((): boolean => selectedGenre.value === Genre.ALL);

  /**
   * Updates the selected genre in the state. This function is called when a user selects a genre from the UI.
   * @param genre - The genre to set as the currently selected genre.
   * This will trigger any reactive updates in the UI that depend on the selected genre.
   */
  const setSelectedGenre = (genre: Genre) => {
    selectedGenre.value = genre;
    resetPagination(pagination.totalRecords);
  };

  return {
    selectedGenre,
    setSelectedGenre,
    showAllGenres,
  };
});
