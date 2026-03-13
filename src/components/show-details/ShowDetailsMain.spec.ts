import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ShowDetailsMain from '@/components/show-details/ShowDetailsMain.vue';
import ShowDetailsSkeleton from '@/components/show-details/ShowDetailsSkeleton.vue';
import ShowImage from '@/components/show-details/ShowImage.vue';
import ShowSummary from '@/components/show-details/ShowSummary.vue';
import ShowInformation from '@/components/show-details/ShowInformation.vue';
import { tvShowComplete } from '@/mocks/shows';

const defaultProps = {
  tvShow: tvShowComplete,
  isLoading: false,
};

describe('Testing ShowDetailsMain component', () => {
  const createWrapper = (props = defaultProps) => {
    return shallowMount(ShowDetailsMain, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  describe('Testing skeleton', () => {
    it('renders a proper Skeleton component, when isLoading is true', () => {
      // arrange & act
      const wrapper = createWrapper({ ...defaultProps, isLoading: true });
      const skeletonComponent = wrapper.findComponent(ShowDetailsSkeleton);
      // assert
      expect(skeletonComponent.exists()).toBe(true);
    });

    it('does not render a Skeleton component, when isLoading is false', () => {
      // arrange & act
      const wrapper = createWrapper();
      const skeletonComponent = wrapper.findComponent(ShowDetailsSkeleton);
      // assert
      expect(skeletonComponent.exists()).toBe(false);
    });
  });

  it('renders 1 ShowImage component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showImageComponent = wrapper.findComponent(ShowImage);
    // assert
    expect(showImageComponent.exists()).toBe(true);
  });

  it('renders 1 ShowSummary component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showSummaryComponent = wrapper.findComponent(ShowSummary);
    // assert
    expect(showSummaryComponent.exists()).toBe(true);
  });

  it('renders 1 ShowInformation component', () => {
    // arrange & act
    const wrapper = createWrapper();
    const showInformationComponent = wrapper.findComponent(ShowInformation);
    // assert
    expect(showInformationComponent.exists()).toBe(true);
  });
});
