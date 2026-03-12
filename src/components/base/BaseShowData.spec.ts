import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Skeleton from 'primevue/skeleton';
import BaseShowData from './BaseShowData.vue';

const defaultProps = {
  label: 'show label',
  value: '100',
  dataTestId: 'data-value',
  showSkeleton: false,
};

describe('Testing BaseShowData component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(BaseShowData, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders the data title as a span', () => {
    // arrange & act
    const wrapper = createWrapper(defaultProps);
    const span = wrapper.find('span');
    // assert
    expect(span.exists()).toBe(true);
    expect(span.text()).toContain(defaultProps.label);
  });

  it('renders the data value as a span, when provided', () => {
    // arrange & act
    const wrapper = createWrapper(defaultProps);
    const spanElements = wrapper.findAll('span');
    // assert
    expect(spanElements).toHaveLength(2);
    expect(spanElements[1]?.text()).toContain(defaultProps.value);
  });

  it('does not render the data value as a span, when showSkeleton is true', () => {
    // arrange & act
    const wrapper = createWrapper({ ...defaultProps, showSkeleton: true });
    const spanElements = wrapper.findAll('span');
    const allSkeletons = wrapper.findAllComponents(Skeleton);
    // assert
    expect(spanElements).toHaveLength(1);
    expect(allSkeletons).toHaveLength(1);
  });
});
