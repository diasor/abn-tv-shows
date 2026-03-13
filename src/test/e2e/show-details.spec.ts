import { test, expect } from '@playwright/test';
import { ShowsDashboardPage } from './pages/ShowsDashboardPage';
import { ShowsDetailsPage } from './pages/ShowsDetailsPage';

/**
 * E2E suite for the TV Show Details page.
 */
const FIXTURE_SHOW_ID = 1;

test.describe('TV Show Details', () => {
  let detailsPage: ShowsDetailsPage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new ShowsDetailsPage(page);
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Clicking a ShowTile navigates to the details page
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Navigation from dashboard', () => {
    const BDD1 = `GIVEN the user is on the TV Shows Dashboard
                 WHEN the user clicks on a show tile
                 THEN the user is redirected to that show's details page`;
    test(BDD1, async ({ page }) => {
      const dashboardPage = new ShowsDashboardPage(page);

      // GIVEN the user is on the TV Shows Dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForShowsLoaded();
      // WHEN the user clicks on a show tile
      const firstTile = dashboardPage.showTiles.first();
      const showName = await firstTile.locator('h2').innerText();
      await firstTile.click();
      // THEN the user is redirected to that show's details page
      await expect(page).toHaveURL(/\/show\/\d+/);
      await detailsPage.waitForDetailsLoaded();
      await expect(detailsPage.heading).toContainText(showName);
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Skeleton and loading title while the API is in-flight
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Loading state', () => {
    const BDD2 = `GIVEN the user navigates to a show details page AND the API is still loading
                 WHEN the page is rendered
                 THEN a loading title and skeleton cards are shown`;
    test(BDD2, async ({ page }) => {
      // Delay the TVMaze API so we can observe the in-between loading state.
      // Use native setTimeout — page.waitForTimeout would throw when the test
      // ends while the route handler is still awaiting.
      await page.route('**/api.tvmaze.com/**', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        await route.continue();
      });

      // GIVEN the user navigates to a show details page AND the API is loading
      await detailsPage.goto(FIXTURE_SHOW_ID);
      // THEN a loading title and skeleton cards are shown
      await expect(detailsPage.heading).toHaveText('TV show details loading...');
      await expect(detailsPage.skeletonCards.first()).toBeVisible();
      // AND once the API responds the real title is shown
      await detailsPage.waitForDetailsLoaded();
      await expect(detailsPage.heading).not.toContainText('loading');
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 3. Layout: image, summary, details, rating, genres
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Show details layout', () => {
    test.beforeEach(async () => {
      // GIVEN the user navigates to a show details page
      await detailsPage.goto(FIXTURE_SHOW_ID);
      await detailsPage.waitForDetailsLoaded();
    });

    const BDD3 = `GIVEN the user navigates to a show details page
                WHEN the API responds successfully
                THEN the show title, image, summary, details, rating and genres are displayed`;
    test(BDD3, async () => {
      // Title
      await expect(detailsPage.heading).toBeVisible();
      await expect(detailsPage.heading).not.toContainText('loading');
      // Image
      await expect(detailsPage.imageSection).toBeVisible();
      await expect(detailsPage.showImage).toBeVisible();
      // Summary
      await expect(detailsPage.summarySection).toBeVisible();
      await expect(detailsPage.summarySection.locator('h3')).toContainText('Summary');
      // Details section
      await expect(detailsPage.detailsSection).toBeVisible();
      await expect(detailsPage.detailsSection.locator('h3')).toContainText('Details');
      // Rating
      await expect(detailsPage.ratingBadge).toBeVisible();
      // Genres
      await expect(detailsPage.genresSection).toBeVisible();
    });

    const BDD3b = `GIVEN the user navigates to a show details page
                 WHEN the API responds successfully
                 THEN the Details section shows Language, Premiered, Type and Scheduled fields`;
    test(BDD3b, async () => {
      await expect(
        detailsPage.detailsSection.locator('[data-testid="show-language"]'),
      ).toBeVisible();
      await expect(
        detailsPage.detailsSection.locator('[data-testid="show-premiered"]'),
      ).toBeVisible();
      await expect(detailsPage.detailsSection.locator('[data-testid="show-type"]')).toBeVisible();
      await expect(
        detailsPage.detailsSection.locator('[data-testid="show-scheduled"]'),
      ).toBeVisible();
    });
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Magnifying the image when clicking on it
  // ────────────────────────────────────────────────────────────────────────────
  test.describe('Image preview (magnify)', () => {
    test.beforeEach(async () => {
      // GIVEN the user is on a show details page
      await detailsPage.goto(FIXTURE_SHOW_ID);
      await detailsPage.waitForDetailsLoaded();
    });

    const BDD4 = `GIVEN the user is on a show details page
                WHEN the user hovers over the show image and clicks it
                THEN the image opens in a full-screen lightbox`;
    test(BDD4, async () => {
      // WHEN the user hovers and clicks the image
      await detailsPage.openImagePreview();
      // THEN the full-screen toolbar confirming the lightbox is open
      await expect(detailsPage.imagePreviewToolbar).toBeVisible();
    });
  });
});
