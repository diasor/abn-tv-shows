import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowsTile from './ShowsTile.vue';
import PrimeVue from 'primevue/config';
import { NOT_AVAILABLE } from '@/shared/api/constants';

describe('Testing ShowsTile.vue', () => {
  const tvShowImage = 'https://example.com/image.jpg';

  const createWrapper = (props = {}) => {
    return mount(ShowsTile, {
      props: {
        name: 'Test Show',
        language: 'English',
        genres: ['Drama', 'Action'],
        premiered: '2020-01-15',
        rating: { average: 8.5 },
        ...props,
      },
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

  it('renders the show title as an h2 heading', () => {
    // arrange & act
    const wrapper = createWrapper();
    const h2 = wrapper.find('h2');
    // assert
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('Test Show');
  });

  describe('TV show image rendering', () => {
    it('renders the show image when provided', () => {
      // arrange & act
      const wrapper = createWrapper({
        image: { medium: tvShowImage, original: tvShowImage },
      });
      const showImage = wrapper.find('img');
      // assert
      expect(showImage.exists()).toBe(true);
      expect(showImage.attributes('src')).toBe(tvShowImage);
      expect(showImage.attributes('alt')).toBe('Test Show');
    });

    it('does not render the image when not provided', () => {
      // arrange & act
      const wrapper = createWrapper({ image: undefined });
      const img = wrapper.find('img');
      // assert
      expect(img.exists()).toBe(false);
    });
  });

  describe('Rating formatting', () => {
    it('formats the rating correctly', () => {
      // arrange & act
      const wrapper = createWrapper({ rating: { average: 8.5 } });
      // assert
      expect(wrapper.text()).toContain('8.5/10');
    });

    it('displays N/A for missing rating', () => {
      // arrange & act
      const wrapper = createWrapper({ rating: { average: null } });
      // assert
      expect(wrapper.text()).toContain(NOT_AVAILABLE);
    });
  });

  describe('Premiered formatting', () => {
    it('formats the premiered date correctly', () => {
      // arrange & act
      const wrapper = createWrapper({ premiered: '2020-01-15' });
      // assert
      expect(wrapper.text()).toContain('Jan');
      expect(wrapper.text()).toContain('2020');
    });

    it('displays N/A, when the premiered date is null', () => {
      // arrange & act
      const wrapper = createWrapper({ premiered: null });
      const premieredText = wrapper.find('[data-testid="show-premiered"]');
      // assert
      expect(premieredText.text()).toContain(NOT_AVAILABLE);
    });

    it('displays N/A, when the premiered date is undefined', () => {
      // arrange & act
      const wrapper = createWrapper({ premiered: undefined });
      const premieredText = wrapper.find('[data-testid="show-premiered"]');
      // assert
      expect(premieredText.text()).toContain(NOT_AVAILABLE);
    });

    it('displays N/A, when the premiered date is an empty string', () => {
      // arrange & act
      const wrapper = createWrapper({ premiered: '' });
      const premieredText = wrapper.find('[data-testid="show-premiered"]');
      // assert
      expect(premieredText.text()).toContain(NOT_AVAILABLE);
    });

    it('displays N/A, when the premiered date is an invalid date', () => {
      // arrange & act
      const wrapper = createWrapper({ premiered: 'something else' });
      const premieredText = wrapper.find('[data-testid="show-premiered"]');
      // assert
      expect(premieredText.text()).toContain(NOT_AVAILABLE);
    });
  });

  describe('Language rendering', () => {
    it('displays language information', () => {
      // arrange & act
      const wrapper = createWrapper({ language: 'English' });
      const languageText = wrapper.find('[data-testid="show-language"]');
      // assert
      expect(languageText.text()).toContain('English');
    });

    it('does not display the language information when not provided', () => {
      // arrange & act
      const wrapper = createWrapper({ language: undefined });
      const languageText = wrapper.find('[data-testid="show-language"]');
      // assert
      expect(languageText.text()).toContain(NOT_AVAILABLE);
    });
  });

  describe('Genres rendering', () => {
    it('displays a maximum of 3 genres', () => {
      // arrange & act
      const wrapper = createWrapper({
        genres: ['Drama', 'Action', 'Comedy', 'Thriller'],
      });
      // assert
      expect(wrapper.text()).toContain('Drama');
      expect(wrapper.text()).toContain('Action');
      expect(wrapper.text()).toContain('Comedy');
      expect(wrapper.text()).not.toContain('Thriller');
    });

    it('does not display the genres section when no genres are provided', () => {
      // arrange & act
      const wrapper = createWrapper({ genres: [] });
      // assert
      expect(wrapper.find('.genres-section').exists()).toBe(false);
    });

    it('does not display the genres section when the array is undefined', () => {
      // arrange & act
      const wrapper = createWrapper({ genres: undefined });
      // assert
      expect(wrapper.find('.genres-section').exists()).toBe(false);
    });
  });
});
