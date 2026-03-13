import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Image from 'primevue/image';
import ShowImage from './ShowImage.vue';
import { tvShowImage } from '@/mocks/shows';

const defaultProps = {
  image: tvShowImage,
  alt: 'image alt text',
  dataTestId: 'show-image',
  showPreview: true,
};

describe('Testing ShowImage component', () => {
  const createWrapper = (props = defaultProps) => {
    return mount(ShowImage, {
      props: { ...props },
      global: {
        plugins: [PrimeVue],
      },
    });
  };

  describe('Testing image with preview', () => {
    it('renders the Image from Prime vue, when showPreview is true', () => {
      // arrange & act
      const wrapper = createWrapper(defaultProps);
      const imageComponent = wrapper.findComponent(Image);
      // assert
      expect(imageComponent.exists()).toBe(true);
    });

    it('renders 1 img element from #image slot with correct src and alt', () => {
      // arrange
      const wrapper = createWrapper(defaultProps);
      const imgElement = wrapper.find('img');
      // assert
      expect(imgElement.attributes('src')).toBe(defaultProps.image.original);
      expect(imgElement.attributes('alt')).toBe(defaultProps.alt);
    });

    it('shows preview img, when the main image is clicked', async () => {
      // arrange
      const wrapper = createWrapper(defaultProps);
      const mainImage = wrapper.find('img');
      // act - click on the main image to trigger preview modal
      await mainImage.trigger('click');
      await flushPromises();
      const imgPreviewElement = wrapper.find('img');
      // assert
      expect(imgPreviewElement.attributes('src')).toBe(defaultProps.image.original);
    });
  });

  describe('Testing image with no preview', () => {
    it('renders 1 img element for the medium image, when showPreview is false', () => {
      // arrange & act
      const wrapper = createWrapper({ ...defaultProps, showPreview: false });
      const imgElement = wrapper.find('img');
      // assert
      expect(imgElement.exists()).toBe(true);
      expect(imgElement.attributes('alt')).toBe(defaultProps.alt);
      expect(imgElement.attributes('src')).toBe(defaultProps.image.medium);
    });
  });
});
