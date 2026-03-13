import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Skeleton from 'primevue/skeleton';
import ShowsTileSkeleton from './ShowsTileSkeleton.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';

describe('Testing ShowsTileSkeleton component', () => {
  const createWrapper = () => {
    return mount(ShowsTileSkeleton, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 1 h2 title per card (so should render 3 h2)', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allH2Titles = wrapper.findAll('h2');
    // assert
    expect(allH2Titles).toHaveLength(3);
    expect(allH2Titles[0]?.text()).toContain('Tv Show loading...');
  });

  it('renders 5 instance of the Skeleton per card (so should render 15)', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allSkeletons = wrapper.findAllComponents(Skeleton);
    // assert
    expect(allSkeletons).toHaveLength(15);
  });

  it('renders 4 instances of the BaseShowData components per card (so should render 12)', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allBaseShowData = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allBaseShowData).toHaveLength(12);
  });
});
