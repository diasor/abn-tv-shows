import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import TheMenu from './TheMenu.vue';
import { routerPushMock } from '@/test/setup';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

beforeEach(() => {
  routerPushMock.mockReset();
});

describe('Testing TheMenu component', () => {
  const createWrapper = () => {
    return mount(TheMenu, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders the Menubar component', () => {
    // arrange & act
    const wrapper = createWrapper();
    // assert
    expect(wrapper.findComponent(Menubar).exists()).toBe(true);
  });

  it('renders the menu container', () => {
    // arrange & act
    const wrapper = createWrapper();
    // assert
    expect(wrapper.find('.menu-container').exists()).toBe(true);
  });

  it('renders menu items with correct labels', () => {
    // arrange & act
    const wrapper = createWrapper();
    const menuText = wrapper.text();
    // assert
    expect(menuText).toContain('Home');
    expect(menuText).toContain('About');
  });

  it('renders navigation links', () => {
    // arrange & act
    const wrapper = createWrapper();
    const links = wrapper.findAll('a');
    // assert
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('navigates to Home when Home link is clicked', async () => {
    // arrange
    const wrapper = createWrapper();
    const homeLink = wrapper.findAll('a').find((a) => a.text().includes('Home'));
    // act
    await homeLink?.trigger('click');
    await flushPromises();
    // assert
    expect(routerPushMock).toHaveBeenCalledWith('/');
  });

  it('navigates to About when About link is clicked', async () => {
    // arrange
    const wrapper = createWrapper();
    const aboutLink = wrapper.findAll('a').find((a) => a.text().includes('About'));
    // act
    await aboutLink?.trigger('click');
    await flushPromises();
    // assert
    expect(routerPushMock).toHaveBeenCalledWith('/about');
  });
});
