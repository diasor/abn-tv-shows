import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGenreStore } from './useGenreStore';
import { Genre } from '@/schemas/genres';

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe('Testing useGenreStore store', () => {
  describe('Testing initial state', () => {
    it('initialises the state properties correctly', () => {
      // arrange & act
      const store = useGenreStore();
      // assert
      expect(store.selectedGenre).toBe(Genre.ALL);
      expect(store.showAllGenres).toBe(true);
    });
  });

  describe('Testing setSelectedGenre method', () => {
    it('sets the selected Genre correctly', () => {
      // arrange
      const store = useGenreStore();
      // act
      store.setSelectedGenre(Genre.THRILLER);
      // assert
      expect(store.selectedGenre).toBe(Genre.THRILLER);
      expect(store.showAllGenres).toBe(false);
    });

    it('sets the selected Genre correctly', () => {
      // arrange
      const store = useGenreStore();
      // act
      store.setSelectedGenre(Genre.ALL);
      // assert
      expect(store.selectedGenre).toBe(Genre.ALL);
      expect(store.showAllGenres).toBe(true);
    });
  });
});
