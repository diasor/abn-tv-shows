import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ScrollPanel from 'primevue/scrollpanel';
import ShowOfficialSite from '@/components/show-details/ShowOfficialSite.vue';

const defaultProps = {
  linkName: 'Official Site',
  linkRef: 'https://www.officialsite.com',
};

describe('Testing ShowOfficialSite component', () => {
  const createWrapper = (props = defaultProps) => {
    return shallowMount(ShowOfficialSite, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders 1 span titled "Official site:"', () => {
    // arrange & act
    const wrapper = createWrapper();
    const spanElement = wrapper.find('span.tv-show-label');
    // assert
    expect(spanElement.exists()).toBe(true);
    expect(spanElement.text()).toBe('Official site:');
  });

  it('renders 1 anchor element with the correct href, when a link is provided', () => {
    // arrange & act
    const wrapper = createWrapper();
    const anchorElement = wrapper.find('a.tv-show-link');
    // assert
    expect(anchorElement.exists()).toBe(true);
    expect(anchorElement.attributes('href')).toBe(defaultProps.linkRef);
  });

  it('renders a span with fallback text, when no link is provided', () => {
    // arrange & act
    const wrapper = createWrapper({ linkName: 'Official Site', linkRef: '' });
    const expectedFallbackText = 'N/A';
    const spanElement = wrapper.find('span.tv-show-value');
    // assert
    expect(spanElement.exists()).toBe(true);
    expect(spanElement.text()).toBe(expectedFallbackText);
  });

  it('does not render an anchor element, when no link is provided', () => {
    // arrange & act
    const wrapper = createWrapper({ linkName: 'Official Site', linkRef: '' });
    const anchorElement = wrapper.find('a.tv-show-link');
    // assert
    expect(anchorElement.exists()).toBe(false);
  });
});
