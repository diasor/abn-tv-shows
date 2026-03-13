import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePaginationStore = defineStore('pagination', () => {
  /**
   * Stores the current page number, number of rows per page, and total records for pagination.
   */
  const page = ref(0);
  const rows = ref(20);
  const totalRecords = ref(0);

  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  const setTotalRecords = (total: number) => {
    totalRecords.value = total;
  };

  const resetPagination = (total: number) => {
    page.value = 0;
    totalRecords.value = total || 0;
  };

  return {
    page,
    rows,
    totalRecords,
    setPage,
    setTotalRecords,
    resetPagination,
  };
});
