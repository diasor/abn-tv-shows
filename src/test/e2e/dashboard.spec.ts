import { test, expect } from '@playwright/test';
import { ShowsDashboardPage } from './pages/ShowsDashboardPage';

/**
 * E2E suite for the TV Shows Dashboard.
 */
test.describe('TV Shows Dashboard', () => {
  let dashboardPage: ShowsDashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new ShowsDashboardPage(page);
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Loading the TV shows dashboard
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Loading the TV shows dashboard', () => {
    const BDD1 = `GIVEN the user navigates to the dashboard AND the TV shows API is still loading
                 WHEN the dashboard is rendered
                 THEN a loading title and skeleton cards are shown`;
    test(BDD1, async ({ page }) => {
      // Delay every TVMaze API call so we can observe the in-between loading state.
      // Use a plain setTimeout rather than page.waitForTimeout — the latter is
      // tied to the test lifecycle and throws when the test ends while the route
      // callback is still in-flight.
      await page.route('**/api.tvmaze.com/**', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        await route.continue();
      });

      // GIVEN the user navigates to the dashboard AND the TV api is loading
      await dashboardPage.goto();

      // THEN a loading title and skeleton cards are shown
      await expect(dashboardPage.heading).toHaveText('TV Shows Dashboard loading...');
      await expect(dashboardPage.skeletonCards.first()).toBeVisible();
    });

    const BDD2 = `GIVEN the user navigates to the dashboard
                WHEN the dashboard is rendered
                the title and ShowTiles are displayed`;
    test(BDD2, async () => {
      // GIVEN the user navigates to the dashboard
      await dashboardPage.goto();
      // WHEN the dashboard is rendered
      await dashboardPage.waitForShowsLoaded();
      // THEN the title and ShowTiles are displayed
      await expect(dashboardPage.heading).toHaveText('TV Shows Dashboard');
      await expect(dashboardPage.showTiles.first()).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Pagination
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Showing pagination', () => {
    test.beforeEach(async () => {
      await dashboardPage.goto();
      await dashboardPage.waitForShowsLoaded();
    });

    const BDD3 = `GIVEN the user navigates to the dashboard
                WHEN the dashboard is rendered
                THEN the paginator with the previous and next page buttons displayed`;
    test(BDD3, async () => {
      await expect(dashboardPage.paginator).toBeVisible();
      await expect(dashboardPage.paginatorNextButton).toBeVisible();
      await expect(dashboardPage.paginatorPrevButton).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 3. Genre filter: rendering and clicking
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Showing the genre filter', () => {
    test.beforeEach(async () => {
      await dashboardPage.goto();
      await dashboardPage.waitForShowsLoaded();
    });

    const BDD4 = `GIVEN the user navigates to the dashboard
                WHEN the dashboard is rendered
                THEN the Genre filter button with a default label are displayed`;
    test(BDD4, async () => {
      await expect(dashboardPage.genreButton).toBeVisible();
      await expect(dashboardPage.genreButton).toContainText('Filter by genre');
    });

    const BDD5 = `GIVEN the user navigates to the dashboard
                WHEN the user clicks on the genre filter button
                THEN the genre dropdown with the the available genres are displayed`;
    test(BDD5, async () => {
      // WHEN the user clicks on the genre filter button
      await dashboardPage.openGenreMenu();
      // THEN the genre dropdown with the available genres is displayed
      await expect(dashboardPage.genreMenu).toBeVisible();
      await expect(dashboardPage.genreMenuItem('Drama')).toBeVisible();
      await expect(dashboardPage.genreMenuItem('Action')).toBeVisible();
      await expect(dashboardPage.genreMenuItem('Comedy')).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Clicking the genre filter and showing the chip
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Clicking the genre filter and showing the chip', () => {
    test.beforeEach(async () => {
      await dashboardPage.goto();
      await dashboardPage.waitForShowsLoaded();
    });

    const BDD6 = `GIVEN the menu with the available genres is displayed
            WHEN the user clicks on one option
            THEN a Chip with the selected genre is displayed`;
    test(BDD6, async () => {
      // GIVEN the menu with the available genres is displayed
      await dashboardPage.openGenreMenu();
      // WHEN the user clicks on one option
      await dashboardPage.selectGenre('Drama');
      // THEN a Chip with the selected genre is displayed
      await expect(dashboardPage.genreChip).toBeVisible();
      await expect(dashboardPage.genreChip).toContainText('Drama');
    });
    const BDD7 = `GIVEN the menu with the available genres is displayed
            WHEN the user selects one option
            THEN the filter button label is updated to "Change filter"`;
    test(BDD7, async () => {
      // GIVEN the menu with the available genres is displayed
      await dashboardPage.openGenreMenu();
      // WHEN the user selects one option
      await dashboardPage.selectGenre('Drama');
      // THEN the filter button label is updated to "Change filter"
      await expect(dashboardPage.genreButton).toContainText('Change filter');
    });

    const BDD8 = `GIVEN the user has selected a genre from the menu
            WHEN the user clicks on the genre chip's close icon
            THEN the chip is dismissed
            AND the filter button label is updated to "Filter by genre"`;
    test(BDD8, async () => {
      // GIVEN the user has selected a genre from the menu
      await dashboardPage.openGenreMenu();
      await dashboardPage.selectGenre('Drama');
      // WHEN the user clicks on the genre chip's close icon
      await dashboardPage.genreChip.click();
      // THEN the chip is dismissed AND the filter button label is updated to "Filter by genre"
      await expect(dashboardPage.genreChip).not.toBeVisible();
      await expect(dashboardPage.genreButton).toContainText('Filter by genre');
    });
  });
});
