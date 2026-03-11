import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShowsStore } from '@/stores/showsStore';
import { fetchClient } from '@/shared/api/fetchClient';

vi.mock('@/shared/api/fetchClient', () => ({
  fetchClient: vi.fn(),
}));

vi.mock('@/shared/api/constants', () => ({
  API_SHOWS_BASE: 'https://api.test.com',
  DEFAULT_SHOWS_LIMIT: 10,
}));

let fetchClientMock: ReturnType<typeof vi.fn>;

const tvShow1 = {
  id: 1,
  name: 'Test Show 1',
  language: 'English',
  genres: ['Drama'],
  premiered: '2020-01-01',
  rating: { average: 8.0 },
  image: { medium: 'https://example.com/image.jpg' },
};

const tvShow2 = {
  id: 2,
  name: 'Test Show 2',
  language: 'Dutch',
  genres: ['Comedy'],
  premiered: '2016-12-01',
  rating: { average: 9.0 },
  image: { medium: 'https://example.com/image2.jpg' },
};

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
  fetchClientMock = vi.mocked(fetchClient);
});

describe('Testing useShowsStore', () => {
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
      store.selectedGenre = 'Drama';
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

  describe('Testing getShowsByGenre method', () => {
    it('calls fetchClient with the correct URL', async () => {
      // arrange
      const store = useShowsStore();
      store.selectedGenre = 'Drama';
      fetchClientMock.mockResolvedValueOnce([]);
      const expectedUrl = 'https://api.test.com/shows?page=Drama&page=1&limit=10';
      // act
      await store.getShowsByGenre(1);
      // assert
      expect(fetchClientMock).toHaveBeenCalledWith(expectedUrl);
    });

    it('sets visibleShows after fetching by genre', async () => {
      // arrange
      const store = useShowsStore();
      fetchClientMock.mockResolvedValueOnce([tvShow1]);
      // act
      await store.getShowsByGenre();
      // assert
      expect(store.visibleShows).toEqual([tvShow1]);
    });
  });
});
