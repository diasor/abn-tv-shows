import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { Button, Menu, Chip } from 'primevue';
import GenreSelector from './GenreSelector.vue';
import { Genre } from '@/schemas/genres';
import { useGenreStore } from '@/stores/useGenreStore';

vi.mock('@/stores/useGenreStore', () => ({
  useGenreStore: vi.fn(() => ({
    selectedGenre: ref(Genre.ALL),
    showAllGenres: ref(true),
    setSelectedGenre: vi.fn(),
  })),
}));

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

describe('Testing GenreSelector component', () => {
  const createWrapper = () => {
    return mount(GenreSelector, {
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  it('renders a Button component with the correct props', () => {
    // arrange & act
    const wrapper = createWrapper();
    const buttonComponent = wrapper.findComponent(Button);
    // assert
    expect(buttonComponent.exists()).toBe(true);
    expect(buttonComponent.props('label')).toBe('Filter by genre');
    expect(buttonComponent.props('icon')).toBe('pi pi-filter');
    expect(buttonComponent.props('iconPos')).toBe('right');
  });

  describe('Testing the Menu component', () => {
    it('renders a Menu component', () => {
      // arrange & act
      const wrapper = createWrapper();
      const menuComponent = wrapper.findComponent(Menu);
      // assert
      expect(menuComponent.exists()).toBe(true);
    });

    it('calls setSelectedGenre with the genre when a menu item is clicked', async () => {
      // arrange
      const setSelectedGenre = vi.fn();
      vi.mocked(useGenreStore).mockReturnValue({
        selectedGenre: ref(Genre.ALL),
        showAllGenres: ref(true),
        setSelectedGenre,
      } as unknown as ReturnType<typeof useGenreStore>);
      const wrapper = createWrapper();
      // act — retrieve the menu model and invoke the Action item's command
      const menuComponent = wrapper.findComponent(Menu);
      const items = menuComponent.props('model') as { id: Genre; command: () => void }[];
      const actionItem = items.find((item) => item.id === Genre.ACTION)!;
      actionItem.command();
      await nextTick();
      // assert
      expect(setSelectedGenre).toHaveBeenCalledOnce();
      expect(setSelectedGenre).toHaveBeenCalledWith(Genre.ACTION);
    });
  });

  describe('Testing the Chip component', () => {
    it('renders the Chip component, when a genre is selected', async () => {
      // arrange
      const mockUseGenStore = vi.mocked(useGenreStore);
      mockUseGenStore.mockReturnValue({
        selectedGenre: ref(Genre.ANIME),
        showAllGenres: ref(false),
        setSelectedGenre: vi.fn(),
      } as unknown as ReturnType<typeof useGenreStore>);
      // act
      const wrapper = createWrapper();
      await nextTick();
      // assert
      expect(wrapper.findComponent(Chip).exists()).toBe(true);
    });

    it('does not render the Chip component, when a genre is ALL', async () => {
      // arrange
      const mockUseGenStore = vi.mocked(useGenreStore);
      mockUseGenStore.mockReturnValue({
        selectedGenre: ref(Genre.ALL),
        showAllGenres: ref(true),
        setSelectedGenre: vi.fn(),
      } as unknown as ReturnType<typeof useGenreStore>);
      // act
      const wrapper = createWrapper();
      await nextTick();
      // assert
      expect(wrapper.findComponent(Chip).exists()).toBe(false);
    });

    it('resets the selected genre, when click on remove Chip', async () => {
      // arrange
      const setSelectedGenre = vi.fn();
      const mockUseGenStore = vi.mocked(useGenreStore);
      mockUseGenStore.mockReturnValue({
        selectedGenre: ref(Genre.ANIME),
        showAllGenres: ref(false),
        setSelectedGenre,
      } as unknown as ReturnType<typeof useGenreStore>);
      const wrapper = createWrapper();
      await nextTick();
      // act
      const chipComponent = wrapper.findComponent(Chip);
      expect(chipComponent.exists()).toBe(true);
      await chipComponent.trigger('click');
      // assert
      expect(setSelectedGenre).toHaveBeenCalledTimes(1);
      expect(setSelectedGenre).toHaveBeenCalledWith(Genre.ALL);
    });
  });
});
