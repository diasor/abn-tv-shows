import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Badge from 'primevue/badge';
import Rating from 'primevue/rating';
import ShowRating from '@/components/show-details/ShowRating.vue';

const defaultProps = {
  rating: {
    average: 8.5,
  },
};

describe('Testing ShowRating component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowRating, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 1 span titled "Rating:"', () => {
    // arrange & act
    const wrapper = createWrapper();
    const spanElement = wrapper.find('span');
    // assert
    expect(spanElement.exists()).toBe(true);
    expect(spanElement.text()).toBe('Rating:');
  });

  it('renders 1 Badge component with the correct rating', () => {
    // arrange & act
    const wrapper = createWrapper();
    const badgeComponent = wrapper.findComponent(Badge);
    // assert
    expect(badgeComponent.exists()).toBe(true);
    expect(badgeComponent.props('value')).toBe('8.5/10');
  });

  it('renders a Rating component with the correct value, if a rating is provided', () => {
    // arrange & act
    const wrapper = createWrapper({ rating: { average: 8.5 } });
    const ratingComponent = wrapper.findComponent(Rating);
    // assert
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props('modelValue')).toBe(4);
  });

  it('does not render a Rating component, when no rating is provided', () => {
    // arrange & act
    const wrapper = createWrapper({ rating: { average: null } });
    const ratingComponent = wrapper.findComponent(Rating);
    // assert
    expect(ratingComponent.exists()).toBe(false);
  });
});
