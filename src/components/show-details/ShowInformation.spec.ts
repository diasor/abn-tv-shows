import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ShowInformation from '@/components/show-details/ShowInformation.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';
import ShowOfficialSite from '@/components/show-details/ShowOfficialSite.vue';
import ShowRating from '@/components/show-details/ShowRating.vue';
import ShowGenres from '@/components/show-details/ShowGenres.vue';
import type { TVShowDetails } from '@/schemas/Shows';

const tvShow: TVShowDetails = {
  id: '1',
  name: 'Test Show',
  language: 'English',
  genres: ['Drama', 'Action'],
  premiered: '2020-01-15',
  rating: { average: 8.5 },
  url: '',
  type: '',
  ended: '2020-01-01',
  image: { medium: 'https://example.com/image.jpg' },
  status: 'Ended',
  runtime: 60,
  officialSite: '',
  schedule: {
    time: '20',
    days: ['Monday'],
  },
  summary: 'show summary',
};

const defaultProps = {
  tvShow,
};

describe('Testing ShowInformation component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowInformation, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 1 h3 titled "Details"', () => {
    // arrange & act
    const wrapper = createWrapper();
    const h3Element = wrapper.find('h3');
    // assert
    expect(h3Element.exists()).toBe(true);
    expect(h3Element.text()).toBe('Details');
  });

  it('renders 1 BaseShowData component with the Language information', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allShowDataComponent).toHaveLength(5);
    expect(allShowDataComponent[0]?.props('label')).toBe('Language');
    expect(allShowDataComponent[0]?.props('value')).toBe(tvShow.language);
  });

  it('renders 1 BaseShowData component with the Premiered information', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allShowDataComponent[1]?.props('label')).toBe('Premiered');
    expect(allShowDataComponent[1]?.props('value')).toBe('January 15, 2020');
  });

  it('renders 1 BaseShowData component with the Type information', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allShowDataComponent[2]?.props('label')).toBe('Type');
    expect(allShowDataComponent[2]?.props('value')).toBe(tvShow.type);
  });

  it('renders 1 ShowOfficialSite component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showOfficialSiteComponent = wrapper.findComponent(ShowOfficialSite);
    // assert
    expect(showOfficialSiteComponent.exists()).toBe(true);
  });

  it('renders 1 ShowRating component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showRatingsComponent = wrapper.findComponent(ShowRating);
    // assert
    expect(showRatingsComponent.exists()).toBe(true);
  });

  it('renders 1 ShowGenres component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showGenresComponent = wrapper.findComponent(ShowGenres);
    // assert
    expect(showGenresComponent.exists()).toBe(true);
  });
});
