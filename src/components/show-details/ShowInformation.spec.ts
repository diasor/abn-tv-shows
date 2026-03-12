import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ShowInformation from '@/components/show-details/ShowInformation.vue';
import BaseShowData from '@/components/base/BaseShowData.vue';
import ShowOfficialSite from '@/components/show-details/ShowOfficialSite.vue';
import ShowRating from '@/components/show-details/ShowRating.vue';
import ShowGenres from '@/components/show-details/ShowGenres.vue';
import { NOT_AVAILABLE } from '@/shared/api/constants';
import { tvShowComplete } from '@/mocks/testing-data';

const defaultProps = {
  tvShow: tvShowComplete,
};
const tvShowWithMissingData = {
  ...tvShowComplete,
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

  describe('Testing Language', () => {
    it('renders 1 BaseShowData component with the Language information', () => {
      // arrange & act
      const wrapper = createWrapper();
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      // assert
      expect(allShowDataComponent).toHaveLength(5);
      expect(allShowDataComponent[0]?.props('label')).toBe('Language');
      expect(allShowDataComponent[0]?.props('value')).toBe(tvShowComplete.language);
    });

    it('renders "N/A" for missing Language information', () => {
      // arrange & act
      // @ts-expect-error - test intentionally removes required field
      delete tvShowWithMissingData.language;
      const propsWithMissingData = {
        tvShow: tvShowWithMissingData,
      };
      const wrapper = createWrapper(propsWithMissingData);
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      const languageSpan = wrapper.find('[data-testid="show-language"]');
      // assert
      expect(allShowDataComponent[0]?.props('label')).toBe('Language');
      expect(allShowDataComponent[0]?.props('value')).toBe(undefined);
      expect(languageSpan.text()).toBe(NOT_AVAILABLE);
    });
  });

  describe('Testing Premiered', () => {
    it('renders 1 BaseShowData component, when the Premiered information is provided', () => {
      // arrange & act
      const wrapper = createWrapper();
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      // assert
      expect(allShowDataComponent[1]?.props('label')).toBe('Premiered');
      expect(allShowDataComponent[1]?.props('value')).toBe('January 15, 2020');
    });

    it('renders "N/A" for Premiered information, when the Premiered information is undefined', () => {
      // arrange
      const tvShowWithoutPremiered = {
        ...tvShowComplete,
        premiered: undefined,
      };
      const propsWithoutPremiered = {
        tvShow: tvShowWithoutPremiered,
      };
      // @ts-expect-error - test intentionally removes required field
      const wrapper = createWrapper(propsWithoutPremiered);
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      // assert
      expect(allShowDataComponent[1]?.props('label')).toBe('Premiered');
      expect(allShowDataComponent[1]?.props('value')).toBe(NOT_AVAILABLE);
    });

    it('renders "N/A" for Premiered information, when the Premiered is not a date', () => {
      // arrange
      const tvShowWithoutPremiered = {
        ...tvShowComplete,
        premiered: 'Not a date',
      };
      const propsWithoutPremiered = {
        tvShow: tvShowWithoutPremiered,
      };
      const wrapper = createWrapper(propsWithoutPremiered);
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      // assert
      expect(allShowDataComponent[1]?.props('label')).toBe('Premiered');
      expect(allShowDataComponent[1]?.props('value')).toBe(NOT_AVAILABLE);
    });
  });

  it('renders 1 BaseShowData component with the Type information', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
    // assert
    expect(allShowDataComponent[2]?.props('label')).toBe('Type');
    expect(allShowDataComponent[2]?.props('value')).toBe(tvShowComplete.type);
  });

  describe('Testing Scheduled', () => {
    it('renders 1 BaseShowData component with the Scheduled information, when the Scheduled information is provided', () => {
      // arrange & act
      const wrapper = createWrapper();
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      // assert
      expect(allShowDataComponent[3]?.props('label')).toBe('Scheduled');
      expect(allShowDataComponent[3]?.props('value')).toBe('Monday at 20');
    });

    it('renders "N/A" for missing Scheduled information', () => {
      // arrange & act
      const tvShowWithMissingData = { ...tvShowComplete };
      // @ts-expect-error - test intentionally removes required field
      delete tvShowWithMissingData.schedule;
      const propsWithMissingData = {
        tvShow: tvShowWithMissingData,
      };
      const wrapper = createWrapper(propsWithMissingData);
      const allShowDataComponent = wrapper.findAllComponents(BaseShowData);
      const scheduledSpan = wrapper.find('[data-testid="show-scheduled"]');
      // assert
      expect(allShowDataComponent[3]?.props('label')).toBe('Scheduled');
      expect(allShowDataComponent[3]?.props('value')).toBe(NOT_AVAILABLE);
      expect(scheduledSpan.text()).toBe(NOT_AVAILABLE);
    });
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
