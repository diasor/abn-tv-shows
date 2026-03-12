import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import ShowsDetailsView from './ShowsDetailsView.vue';
import ShowTabs from '@/components/show-details/ShowTabs.vue';
import ShowDetailsMain from '@/components/show-details/ShowDetailsMain.vue';
import { useShowDetailsStore } from '@/stores/useShowDetailsStore';
import { tvShow1 } from '@/mocks/testing-data';

vi.mock('@/stores/useShowDetailsStore', () => ({
  useShowDetailsStore: vi.fn(() => ({
    selectedShow: ref({ ...tvShow1 }),
    isLoading: ref(false),
    fetchShowDetails: vi.fn(),
  })),
}));

const defaultProps = {
  id: '1',
};

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe('Testing ShowsDetailsView view', () => {
  const createWrapper = (props = { ...defaultProps }) => {
    return mount(ShowsDetailsView, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders a Card component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const cardComponent = wrapper.findComponent(Card);
    // assert
    expect(cardComponent.exists()).toBe(true);
  });

  it('renders an h1 heading', () => {
    // arrange & act
    const wrapper = createWrapper();
    const expectedHeading = `${tvShow1.name}'s details`;
    const h1 = wrapper.find('h1');
    // assert
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe(expectedHeading);
  });

  it('renders a fallback h1 heading, when no show has been selected', () => {
    // arrange & act
    const mockUseShowDetailsStore = vi.mocked(useShowDetailsStore);
    mockUseShowDetailsStore.mockReturnValue({
      selectedShow: ref({}),
      fetchShowDetails: vi.fn(),
    } as unknown as ReturnType<typeof useShowDetailsStore>);
    const wrapper = createWrapper();
    const expectedHeading = 'TV Show Details';
    const h1 = wrapper.find('h1');
    // assert
    expect(h1.exists()).toBe(true);
    expect(h1.text()).toBe(expectedHeading);
  });

  it('renders 1 ShowTabs component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showTabsComponents = wrapper.findComponent(ShowTabs);
    // assert
    expect(showTabsComponents.exists()).toBe(true);
  });

  it('renders 1 ShowDetailsMain component', async () => {
    // arrange & act
    const mockUseShowDetailsStore = vi.mocked(useShowDetailsStore);
    mockUseShowDetailsStore.mockReturnValue({
      fetchShowDetails: vi.fn(),
      selectedShow: ref({ ...tvShow1 }),
      isLoading: ref(false),
    } as unknown as ReturnType<typeof useShowDetailsStore>);
    const wrapper = await createWrapper();
    const showDetailsMainComponent = wrapper.findComponent(ShowDetailsMain);
    // assert
    expect(showDetailsMainComponent.exists()).toBe(true);
    expect(showDetailsMainComponent.props('tvShow')).toEqual(tvShow1);
    expect(showDetailsMainComponent.props('isLoading')).toBe(false);
  });
});
