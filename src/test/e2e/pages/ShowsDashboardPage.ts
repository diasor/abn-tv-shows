import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the TV Shows Dashboard page (`/`).
 *
 * Encapsulates all locators and user interactions so that individual
 * test files only deal with assertions — not with selector strings.
 */
export class ShowsDashboardPage {
  readonly page: Page;

  /* Layout */
  readonly heading: Locator;
  readonly skeletonCards: Locator;
  readonly showTiles: Locator;

  /* Genre filter */
  readonly genreButton: Locator;
  readonly genreMenu: Locator;
  readonly genreChip: Locator;

  /* Pagination */
  readonly paginator: Locator;
  readonly paginatorNextButton: Locator;
  readonly paginatorPrevButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.skeletonCards = page.locator('.p-skeleton');
    this.showTiles = page.locator('.tv-show-tile');
    this.genreButton = page.locator('.genre-button');
    this.genreMenu = page.locator('[role="menu"]');
    this.genreChip = page.locator('.genre-chip');
    this.paginator = page.locator('.p-paginator');
    this.paginatorNextButton = page.locator('.p-paginator-next');
    this.paginatorPrevButton = page.locator('.p-paginator-prev');
  }

  /* Navigation */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Waits until at least one show tile is visible, meaning the async
   * fetch has completed and the catalogue is rendered.
   */
  async waitForShowsLoaded(): Promise<void> {
    await this.showTiles.first().waitFor({ state: 'visible' });
  }

  /**
   * Clicks the genre filter button and waits for the popup
   * menu to appear.
   */
  async openGenreMenu(): Promise<void> {
    await this.genreButton.click();
    await this.genreMenu.waitFor({ state: 'visible' });
  }

  /**
   * Clicks the genre menu item that matches `genreLabel`.
   * Call `openGenreMenu()` first.
   */
  async selectGenre(genreLabel: string): Promise<void> {
    // Wait for the PrimeVue Menu enter animation to finish before clicking,
    // otherwise Playwright reports the element as "not stable".
    const item = this.genreMenu.getByRole('menuitem', { name: genreLabel });
    await item.waitFor({ state: 'visible' });
    await item.click();
  }

  /**
   * Returns the Locator for a specific menu item by its visible label.
   * Useful for individual assertions without triggering a click.
   */
  genreMenuItem(genreLabel: string): Locator {
    return this.genreMenu.getByRole('menuitem', { name: genreLabel });
  }
}
