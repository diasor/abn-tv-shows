<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Chip from 'primevue/chip';
import { GENRES, getGenreConfig } from '@/shared/genres';
import { useGenreStore } from '@/stores/useGenreStore';
import { Genre } from '@/schemas/genres';

const menu = ref();
const toggleMenu = (event: Event) => menu.value.toggle(event);

/*
 * Build all genre items.
 */
const allMenuGenreItems = computed(() =>
  Object.values(GENRES).map((genre) => {
    const config = getGenreConfig(genre.id);
    return {
      id: genre.id,
      label: config.label,
      icon: config.icon,
      command: () => updateCurrentGenre(genre.id),
    };
  }),
);

/**
 * Selected genre from the store section
 */
const genreStore = useGenreStore();
const { selectedGenre, showAllGenres } = storeToRefs(genreStore);
const showGenreChip = ref(false);
const resetGenre = () => {
  genreStore.setSelectedGenre(Genre.ALL);
  showGenreChip.value = false;
};
const updateCurrentGenre = (id: Genre) => {
  genreStore.setSelectedGenre(id);
};

/**
 * Current selected genre data
 */
const currentGenreLabel = ref('');
const currentGenreIcon = ref('');
const currentGenreColor = ref('');
const selectGenreLabel = computed((): string =>
  showAllGenres.value ? 'Filter by genre' : 'Change filter',
);

onMounted(() => {
  if (!showAllGenres.value) {
    const config = getGenreConfig(selectedGenre.value);
    currentGenreLabel.value = config.label;
    currentGenreIcon.value = config.icon;
    currentGenreColor.value = config.color;
    showGenreChip.value = true;
  }
});
watch(selectedGenre, (newGenre, oldGenre) => {
  if (newGenre === oldGenre) return; // No change, skip
  if (selectedGenre.value && selectedGenre.value !== Genre.ALL) {
    const config = getGenreConfig(selectedGenre.value);
    currentGenreLabel.value = config.label;
    currentGenreIcon.value = config.icon;
    currentGenreColor.value = config.color;
    showGenreChip.value = true;
  } else {
    currentGenreLabel.value = '';
    currentGenreIcon.value = '';
    currentGenreColor.value = '';
    showGenreChip.value = false;
  }
});
</script>

<template>
  <div class="genre-container">
    <Button
      class="genre-button"
      :label="selectGenreLabel"
      icon="pi pi-filter"
      icon-pos="right"
      @click="toggleMenu"
    />
    <Menu ref="menu" :model="allMenuGenreItems" popup :style="{ color: currentGenreColor }" />

    <Chip
      v-if="showGenreChip"
      :label="currentGenreLabel"
      :icon="currentGenreIcon"
      class="genre-chip"
      :style="{ color: currentGenreColor }"
      removable
      @click="resetGenre"
    >
    </Chip>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;
.genre-container {
  display: flex;
  flex: 1;
  margin: 2rem;
  gap: 1rem;
}

.genre-button {
  font-weight: 500;
  font-family: $font-playful;
  color: $color-lilac-dark;
  text-shadow: $font-text-shadow-playful;
  background: $background-gradient !important;
  border: 1px solid $color-lilac-dark !important;
}

.genre-button:hover {
  border-radius: 0.5rem;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
}

.genre-chip {
  font-weight: 500;
  font-family: $font-playful;
  text-shadow: $font-text-shadow-playful;
  background: transparent !important;
  border: 1px solid currentColor !important;

  :deep(.p-chip-icon) {
    color: currentColor;
    font-weight: 700;
  }

  :deep(.p-chip-remove-icon) {
    color: currentColor;
    fill: currentColor;
  }
}
</style>
