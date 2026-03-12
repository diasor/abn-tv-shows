import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Skeleton from 'primevue/skeleton';
import ShowDetailsSkeleton from './ShowDetailsSkeleton.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';

describe('Testing ShowDetailsSkeleton component', () => {
  const createWrapper = () => {
    return shallowMount(ShowDetailsSkeleton, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 2 h3 titles', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allH3 = wrapper.findAll('h3');
    // assert
    expect(allH3).toHaveLength(2);
    expect(allH3[0]?.text()).toContain('Summary');
    expect(allH3[1]?.text()).toContain('Details');
  });

  it('renders 2 instances of the Skeleton component from PrimeVue', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allSkeletons = wrapper.findAllComponents(Skeleton);
    // assert
    expect(allSkeletons).toHaveLength(2);
  });

  it('renders 4 instances of the BaseShowData components', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allBaseShowData = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allBaseShowData).toHaveLength(4);
  });
});
