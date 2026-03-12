import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShowDetailsStore } from '@/stores/useShowDetailsStore';
import { fetchClient } from '@/shared/api/fetchClient';
import { tvShow1, tvShow2 } from '@/mocks/testing-data';

vi.mock('@/shared/api/fetchClient', () => ({
  fetchClient: vi.fn(),
}));

let fetchClientMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
  fetchClientMock = vi.mocked(fetchClient);
});

describe('Testing useShowDetailsStore', () => {
  describe('Testing initial state', () => {
    it('initialises the state properties correctly', () => {
      // arrange & act
      const store = useShowDetailsStore();
      // assert
      expect(store.isLoading).toBe(false);
      expect(store.selectedShow).toEqual({});
    });
  });

  describe('Testing fetchShowDetails method', () => {
    it('sets isLoading to true while fetching', async () => {
      // arrange
      const store = useShowDetailsStore();
      let loadingDuringFetch = false;
      fetchClientMock.mockImplementation(() => {
        loadingDuringFetch = store.isLoading;
        return Promise.resolve(tvShow1);
      });
      // act
      await store.fetchShowDetails('1');
      // assert
      expect(loadingDuringFetch).toBe(true);
      expect(store.isLoading).toBe(false);
    });

    it('sets selectedShow, when the api succeeds fetching', async () => {
      // arrange
      const store = useShowDetailsStore();
      fetchClientMock.mockResolvedValueOnce(tvShow1);
      // act
      await store.fetchShowDetails('1');
      // assert
      expect(store.selectedShow).toEqual(tvShow1);
    });

    it('calls fetchClient with correct URL', async () => {
      // arrange
      const store = useShowDetailsStore();
      fetchClientMock.mockResolvedValueOnce([]);
      const expectedUrl = 'https://api.tvmaze.com/shows/1';
      // act
      await store.fetchShowDetails('1');
      // assert
      expect(fetchClientMock).toHaveBeenCalledWith(expectedUrl);
    });

    it('sets isLoading to false after fetch completes', async () => {
      // arrange
      const store = useShowDetailsStore();
      fetchClientMock.mockResolvedValueOnce(tvShow1);
      // act
      await store.fetchShowDetails('1');
      // assert
      expect(store.isLoading).toBe(false);
    });
  });
});
