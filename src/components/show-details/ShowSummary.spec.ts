import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ScrollPanel from 'primevue/scrollpanel';
import ShowSummary from '@/components/show-details/ShowSummary.vue';

const defaultProps = {
  summary: 'This is a summary of the show.',
};

describe('Testing ShowSummary component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowSummary, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 1 h3 titled "Summary"', () => {
    // arrange & act
    const wrapper = createWrapper();
    const h3Element = wrapper.find('h3');
    // assert
    expect(h3Element.exists()).toBe(true);
    expect(h3Element.text()).toBe('Summary');
  });

  it('renders 1 ScrollPanel component with the correct text, when a summary is provided', () => {
    // arrange & act
    const wrapper = createWrapper();
    const scrollPanelComponent = wrapper.findComponent(ScrollPanel);
    // assert
    expect(scrollPanelComponent.exists()).toBe(true);
    expect(scrollPanelComponent.text()).toBe(defaultProps.summary);
  });

  it('renders a ScrollPanel component with a fallback text, if no summary is provided', () => {
    // arrange & act
    const wrapper = createWrapper({ summary: '' });
    const expectedFallbackText = 'This show does not have a summary available.';
    const scrollPanelComponent = wrapper.findComponent(ScrollPanel);
    // assert
    expect(scrollPanelComponent.exists()).toBe(true);
    expect(scrollPanelComponent.text()).toBe(expectedFallbackText);
  });
});
