import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Tabs from 'primevue/tabs';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ShowTabs from '@/components/show-details/ShowTabs.vue';

const defaultProps = {
  tabSelected: '1',
};

describe('Testing ShowTabs component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowTabs, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders the following PrimeVuew components: Tabs, TabList', () => {
    // arrange & act
    const wrapper = createWrapper();
    const tabsComponent = wrapper.findComponent(Tabs);
    const tabListComponent = wrapper.findComponent(TabList);
    // assert
    expect(tabsComponent.exists()).toBe(true);
    expect(tabListComponent.exists()).toBe(true);
  });

  it('renders 3 Tab PrimeVue components, with the correct texts and icons', () => {
    // arrange & act
    const wrapper = createWrapper();
    const allTabComponents = wrapper.findAllComponents(Tab);
    // assert
    expect(allTabComponents).toHaveLength(3);
    expect(allTabComponents[0]?.text()).toBe('Main');
    expect(allTabComponents[1]?.text()).toBe('Episodes');
    expect(allTabComponents[2]?.text()).toBe('Photos');
  });
});
