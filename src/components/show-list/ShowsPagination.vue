<script setup lang="ts">
import Paginator, { type PageState } from 'primevue/paginator';
import { usePaginationStore } from '@/stores/usePaginationStore';

const pagination = usePaginationStore();

const onPageChange = (event: PageState) => {
  pagination.setPage(event.page);
};
</script>

<template>
  <div class="pagination">
    <Paginator
      :rows="pagination.rows"
      :totalRecords="pagination.totalRecords"
      :first="pagination.page * pagination.rows"
      @page="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.pagination {
  display: flex;

  @media (max-width: 500px) {
    padding: 0;
    margin: 0;
    width: 100%;
    overflow: hidden;

    // Allow the inner paginator row to wrap onto multiple lines
    :deep(.p-paginator-content) {
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }

    // Allow the page-numbers group to wrap and shrink
    :deep(.p-paginator-pages) {
      flex-wrap: wrap;
      justify-content: center;
    }

    // Hide first/last page buttons to save space
    :deep(.p-paginator-first),
    :deep(.p-paginator-last) {
      display: none;
    }

    // Shrink page number and prev/next buttons
    :deep(.p-paginator-page),
    :deep(.p-paginator-prev),
    :deep(.p-paginator-next) {
      min-width: 1.75rem;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      font-size: 0.75rem;
    }
  }
  // selected page button
  :deep(.p-paginator-page-selected) {
    background: $color-lilac-light;
    color: $color-lilac-dark;
    font-family: $font-playful;
    box-shadow: $box-shadow-gradient;
  }

  // all page buttons (including prev/next/first/last)
  :deep(.p-paginator-page),
  :deep(.p-paginator-prev),
  :deep(.p-paginator-next),
  :deep(.p-paginator-first),
  :deep(.p-paginator-last) {
    font-family: $font-playful;
  }

  // current page report text (e.g. "1 of 10")
  :deep(.p-paginator-current) {
    font-family: $font-playful;
    color: $color-lilac-dark;
  }

  // the whole paginator container
  :deep(.p-paginator-content) {
    background: transparent;
  }

  :deep(.p-paginator-first:not(.p-disabled):hover),
  :deep(.p-paginator-prev:not(.p-disabled):hover),
  :deep(.p-paginator-next:not(.p-disabled):hover),
  :deep(.p-paginator-last:not(.p-disabled):hover),
  :deep(.p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover),
  :deep(.p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover) {
    background: $background-gradient;
    box-shadow: $box-shadow-gradient;
  }
}
</style>
