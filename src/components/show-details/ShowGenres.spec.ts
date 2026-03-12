import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Badge from 'primevue/badge';
import ShowGenres from '@/components/show-details/ShowGenres.vue';

const defaultProps = {
  genres: ['Drama', 'Action', 'Comedy'],
};

describe('Testing ShowGenres component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowGenres, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders no Badge component, if no genres are provided', () => {
    // arrange & act
    const wrapper = createWrapper({ genres: [] });
    const badgeComponents = wrapper.findAllComponents(Badge);
    // assert
    expect(badgeComponents).toHaveLength(0);
  });

  it('renders 1 Badge component for each genre', () => {
    // arrange & act
    const wrapper = createWrapper();
    const badgeComponents = wrapper.findAllComponents(Badge);
    // assert
    expect(badgeComponents).toHaveLength(defaultProps.genres.length);
  });

  it('renders the correct genre text in each Badge component', () => {
    // arrange
    const wrapper = createWrapper(defaultProps);
    const badgeComponents = wrapper.findAllComponents(Badge);
    // assert
    badgeComponents.forEach((badge, index) => {
      expect(badge.props('value')).toBe(defaultProps.genres[index]);
    });
  });

  it('renders the first 2 genres, when more than 2 genres are provided', () => {
    // arrange
    const props = {
      genres: ['Drama', 'Action', 'Comedy', 'Thriller', 'Sci-Fi'],
    };
    const expectedGenres = props.genres.slice(0, 2); // Show max 3 genres
    const wrapper = createWrapper(props);
    const badgeComponents = wrapper.findAllComponents(Badge);
    // assert
    badgeComponents.forEach((badge, index) => {
      expect(badge.props('value')).toBe(expectedGenres[index]);
    });
  });
});
