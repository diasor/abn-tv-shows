import { vi, describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ShowsDashboardView from './ShowsDashboardView.vue';
import ShowsTile from '@/components/show-list/ShowsTile.vue';
import { useShowsStore } from '@/stores/useShowsStore';
import { tvShow1, tvShow2 } from '@/mocks/testing-data';

vi.mock('@/stores/useShowsStore', () => ({
  useShowsStore: vi.fn(() => ({
    visibleShows: [tvShow1, tvShow2],
    fetchShows: vi.fn(),
  })),
}));

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe('Testing ShowsDashboardView', () => {
  const createWrapper = () => {
    return mount(ShowsDashboardView, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders a Card component', () => {
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

  describe('Testing the ShowTitle component', () => {
    it('renders 2 ShowsTitle components with the correct data, when there are 2 shows in the state', () => {
      // arrange & act
      const wrapper = createWrapper();
      const tvShowComponents = wrapper.findAllComponents(ShowsTile);
      // assert
      expect(tvShowComponents).toHaveLength(2);
      expect(tvShowComponents[0]?.props('tvShow')).toEqual(tvShow1);
      expect(tvShowComponents[1]?.props('tvShow')).toEqual(tvShow2);
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
