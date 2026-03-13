import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the TV Show Details page (`/show/:id`).
 *
 * Encapsulates all locators and user interactions so that individual
 * test files only deal with assertions — not with selector strings.
 */
export class ShowsDetailsPage {
  readonly page: Page;

  /* Layout */
  readonly heading: Locator;
  readonly skeletonCards: Locator;

  /* Image locator */
  readonly imageSection: Locator;
  readonly showImage: Locator;
  readonly imagePreviewMask: Locator;
  readonly imagePreviewToolbar: Locator;

  /* Details locators */
  readonly summarySection: Locator;
  readonly detailsSection: Locator;
  readonly ratingBadge: Locator;
  readonly genresSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.skeletonCards = page.locator('.p-skeleton');
    this.imageSection = page.locator('.tv-show-image-section');
    this.showImage = page.locator('.tv-show-image-full');
    this.imagePreviewMask = page.locator('.p-image-preview-mask');
    this.imagePreviewToolbar = page.locator('.p-image-toolbar');
    this.summarySection = page.locator('.tv-show-summary');
    this.detailsSection = page.locator('.tv-show-info');
    this.ratingBadge = page.locator('.tv-show-rating-badge');
    this.genresSection = page.locator('.tv-show-genres-section');
  }

  /** Navigate directly to the details page for the given show `id`. */
  async goto(id: string | number): Promise<void> {
    await this.page.goto(`/show/${id}`);
  }

  /**
   * Waits until the page title no longer shows the loading placeholder,
   * meaning the API call has resolved and the full details are rendered.
   */
  async waitForDetailsLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.page.waitForFunction(
      () => !document.querySelector('h1')?.textContent?.includes('loading'),
    );
  }

  /**
   * Opens the full-screen image lightbox.
   * In PrimeVue v4, the Image component renders a `<button aria-label="Zoom Image">`
   * (`.p-image-preview-mask`) that sits on top of the image at all times and
   * intercepts pointer events, so we click it directly without hovering first.
   */
  async openImagePreview(): Promise<void> {
    await this.imagePreviewMask.click();
  }
}
