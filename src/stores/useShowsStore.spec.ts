import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShowsStore } from '@/stores/useShowsStore';
import { fetchClient } from '@/shared/api/fetchClient';
import { tvShow1, tvShow2 } from '@/mocks/shows';
import { Genre } from '@/schemas/genres';
import { useGenreStore } from './useGenreStore';

vi.mock('@/shared/api/fetchClient', () => ({
  fetchClient: vi.fn(),
}));

vi.mock('@/shared/api/constants', () => ({
  API_SHOWS_BASE: 'https://api.test.com',
  DEFAULT_SHOWS_LIMIT: 10,
}));

let fetchClientMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
  fetchClientMock = vi.mocked(fetchClient);
});

describe('Testing useShowsStore store', () => {
  describe('Testing initial state', () => {
    it('initialises the state properties correctly', () => {
      // arrange & act
      const store = useShowsStore();
      // assert
      expect(store.visibleShows).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(store.selectedGenre).toBe('All');
    });
  });

  describe('Testing fetchShows method', () => {
    it('sets isLoading to true while fetching', async () => {
      // arrange
      const store = useShowsStore();
      let loadingDuringFetch = false;
      fetchClientMock.mockImplementation(() => {
        loadingDuringFetch = store.isLoading;
        return Promise.resolve([tvShow1]);
      });
      // act
      await store.fetchShows();
      // assert
      expect(loadingDuringFetch).toBe(true);
      expect(store.isLoading).toBe(false);
    });

    it('sets visibleShows, when the api succeeds fetching', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1, tvShow2]);
      // act
      await store.fetchShows();
      // assert
      expect(store.visibleShows).toEqual([tvShow1, tvShow2]);
    });

    it('calls fetchClient with correct URL', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([]);
      const expectedUrl = 'https://api.test.com/shows?&page=2&limit=10';
      // act
      await store.fetchShows(2);
      // assert
      expect(fetchClientMock).toHaveBeenCalledWith(expectedUrl);
    });

    it('sets isLoading to false after fetch completes', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1]);
      // act
      await store.fetchShows();
      // assert
      expect(store.isLoading).toBe(false);
    });

    it('sets isLoading to false after fetch completes', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1]);
      // act
      await store.fetchShows();
      // assert
      expect(store.isLoading).toBe(false);
    });
  });

  describe('Testing visibleShows computed', () => {
    it('returns all shows when selectedGenre is All', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1, tvShow2]);
      // act
      await store.fetchShows();
      // assert
      expect(store.selectedGenre).toBe('All');
      expect(store.visibleShows).toEqual([tvShow1, tvShow2]);
    });

    it('filters shows by selected genre', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1, tvShow2]);
      await store.fetchShows();
      // act
      store.selectedGenre = Genre.DRAMA;
      // assert
      expect(store.visibleShows).toEqual([tvShow1]);
    });

    it('sets an empty array, when the api fails', async () => {
      // arrange
      const store = useShowsStore();
      const errorApi = { status: 500, description: 'Error' };
      fetchClientMock.mockRejectedValueOnce(errorApi);
      // act
      await store.fetchShows();
      // assert
      expect(store.visibleShows).toEqual([]);
    });
  });

  describe('Testing showsByGenre computed', () => {
    it('groups shows by genre and sorts them by rating', async () => {
      // arrange
      const store = useShowsStore();
      const showA = { ...tvShow1, genres: [Genre.DRAMA], rating: { average: 8 } };
      const showB = { ...tvShow2, genres: [Genre.COMEDY], rating: { average: 9 } };
      const showC = { ...tvShow1, id: 3, genres: [Genre.DRAMA], rating: { average: 7 } };
      fetchClientMock.mockResolvedValueOnce([showA, showB, showC]);
      // act
      await store.fetchShows();
      // assert
      expect(store.showsByGenre).toEqual([
        { genre: Genre.COMEDY, shows: [showB] },
        { genre: Genre.DRAMA, shows: [showA, showC] },
      ]);
    });

    it('returns shows filtered by the selected genre', async () => {
      // arrange
      const genreStore = useGenreStore();
      genreStore.selectedGenre = Genre.THRILLER;
      const store = useShowsStore();
      const showA = { ...tvShow1, genres: [Genre.DRAMA], rating: { average: 8 } };
      const showB = { ...tvShow2, genres: [Genre.COMEDY], rating: { average: 9 } };
      const showC = {
        ...tvShow1,
        id: 3,
        genres: [Genre.DRAMA, Genre.THRILLER],
        rating: { average: 7 },
      };
      fetchClientMock.mockResolvedValueOnce([showA, showB, showC]);
      // act
      await store.fetchShows();
      // assert
      expect(store.showsByGenre).toEqual([{ genre: Genre.THRILLER, shows: [showC] }]);
    });

    it('returns shows with UNKNOWN genre, if the original genre list is empty', async () => {
      // arrange
      const store = useShowsStore();
      const showA = { ...tvShow1, genres: [], rating: { average: 8 } };
      const showB = { ...tvShow2, genres: [Genre.COMEDY], rating: { average: 9 } };
      const showC = {
        ...tvShow1,
        id: 3,
        genres: [Genre.DRAMA],
        rating: { average: 7 },
      };
      fetchClientMock.mockResolvedValueOnce([showA, showB, showC]);
      // act
      await store.fetchShows();
      // assert
      expect(store.showsByGenre).toEqual([
        { genre: Genre.COMEDY, shows: [showB] },
        { genre: Genre.DRAMA, shows: [showC] },
        { genre: Genre.UNKNOWN, shows: [showA] },
      ]);
    });
  });
});
