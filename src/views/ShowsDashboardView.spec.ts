import { vi, describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ShowsDashboardView from './ShowsDashboardView.vue';
import ShowsTile from '@/components/shows/ShowsTile.vue';
import { useShowsStore } from '@/stores/showsStore';
import type { _DeepPartial, SubscriptionCallback, StoreOnActionListener } from 'pinia';
import type { ComputedRef, Ref, WatchOptions } from 'vue';

const tvShow1 = {
  name: 'Test Show 1',
  language: 'English',
  genres: ['Drama'],
  premiered: '2020-01-01',
  rating: { average: 8.0 },
  image: { medium: 'https://example.com/image.jpg' },
};
const tvShow2 = {
  name: 'Test Show 2',
  language: 'Dutch',
  genres: ['Comedy'],
  premiered: '2016-12-01',
  rating: { average: 9.0 },
  image: { medium: 'https://example.com/image.jpg' },
};
vi.mock('@/stores/showsStore', () => ({
  useShowsStore: vi.fn(() => ({
    visibleShows: [tvShow1, tvShow2],
    fetchShows: vi.fn(),
  })),
}));

describe('Testing ShowsDashboardView', () => {
  const createWrapper = () => {
    return mount(ShowsDashboardView, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders Card component', () => {
    // arrange & act
    const wrapper = createWrapper();
    // assert
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true);
  });

  it('renders an h1 heading', () => {
    // arrange & act
    const wrapper = createWrapper();
    const h1 = wrapper.find('h1');
    // assert
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe('TV Shows Dashboard');
  });

  describe('Testing the ShowTitle components', () => {
    it('renders 2 ShowsTitle components with the correct data, when there are 2 shows in the state', () => {
      // arrange & act
      const wrapper = createWrapper();
      const tvShowComponents = wrapper.findAllComponents(ShowsTile);
      // assert
      expect(tvShowComponents).toHaveLength(2);
      expect(tvShowComponents[0]?.props()).toMatchObject(tvShow1);
      expect(tvShowComponents[1]?.props()).toMatchObject(tvShow2);
    });

    it('renders no ShowsTile components when no shows are available', () => {
      // arrange
      const mockUseShowsStore = vi.mocked(useShowsStore);
      mockUseShowsStore.mockReturnValue({
        visibleShows: [],
        fetchShows: vi.fn(),
      } as unknown as ReturnType<typeof useShowsStore>);
      // act
      const wrapper = createWrapper();
      // assert
      const tvShowComponents = wrapper.findAllComponents(ShowsTile);
      expect(tvShowComponents).toHaveLength(0);
    });
  });
});
