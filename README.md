# abn-tv-shows

## Project Description

abn-tv-shows is a single-page application that lets users browse and explore TV shows sourced from the [TVMaze public API](https://api.tvmaze.com). Users can browse a paginated catalogue of shows, filter by genre, and open a dedicated details page for each show with information such as rating, schedule, genres, language, premiere date, and a summary.

---

## Tech Stack

| Layer                | Technology                                                                      |
| -------------------- | ------------------------------------------------------------------------------- |
| Framework            | [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)                |
| Language             | TypeScript                                                                      |
| Build tool           | [Vite](https://vite.dev/)                                                       |
| State management     | [Pinia](https://pinia.vuejs.org/)                                               |
| Routing              | [Vue Router 5](https://router.vuejs.org/)                                       |
| UI component library | [PrimeVue 4](https://primevue.org/) + PrimeIcons                                |
| Styling              | SCSS (via `sass-embedded`)                                                      |
| Unit testing         | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) |
| End-to-end testing   | [Playwright](https://playwright.dev/)                                           |
| Linting              | ESLint + oxlint                                                                 |
| Formatting           | Prettier                                                                        |

---

## Architecture

```
src/
├── assets/           # Global SCSS (base, theme, main)
├── components/
│   ├── base/         # Shared, reusable presentational components (BaseShowData, TheMenu)
│   ├── show-details/ # Components for a single show detail page
│   └── show-list/    # Components for the show catalogue (ShowsTile, GenreSelector, ShowsPagination, etc.)
├── router/           # Vue Router configuration (3 routes: dashboard, show-details, about)
├── schemas/          # TypeScript types / Zod schemas for TVShow & TVShowDetails
├── shared/
│   └── api/          # fetchClient utility + API constants (base URL, N/A fallback)
├── stores/
│   ├── useShowsStore.ts        # Catalogue state: all shows, genre filtering, paged/grouped views
│   ├── useGenreStore.ts        # Selected genre state and helpers
│   ├── usePaginationStore.ts   # Page, rows per page, total records
│   └── useShowDetailsStore.ts  # Single-show state: selected show, loading flag
├── test/             # Vitest global setup (mocks, stubs, directives)
└── views/
    ├── ShowsDashboardView.vue  # Catalogue page
    ├── ShowsDetailsView.vue    # Detail page
    └── AboutView.vue           # About page
```

**Data flow:** Views consume Pinia stores → stores call `fetchClient` → `fetchClient` wraps the native `fetch` API against the TVMaze REST API.

**Pagination strategy:** All shows are fetched in a single request on startup and stored in `allShows`. Client-side computed properties handle genre filtering (`filteredShows`) and page slicing (`pagedShows`), so navigating between pages and switching genres never triggers an additional network request.

---

## Main Flows

### 1. Browse the shows catalogue

1. User navigates to `/` → `ShowsDashboardView` mounts.
2. `useShowsStore` initialises with a `watch({ immediate: true })` on the pagination state, which triggers `fetchShows()` on startup.
3. `fetchShows()` calls `GET /shows` on the TVMaze API and stores the full response in `allShows`.
4. The computed chain derives the visible data:
   - `filteredShows` — `allShows` filtered by the selected genre (or the full list when _All_ is selected).
   - `pagedShows` — a slice of `filteredShows` for the current page and page size.
   - `showsByGenre` — `pagedShows` grouped and sorted by genre, consumed by the dashboard template.
5. `ShowsTile` components render for each show in the current page's genre groups.

### 2. Filter shows by genre

1. User opens the genre menu via the `GenreSelector` button and picks a genre.
2. `setSelectedGenre` in `useGenreStore` updates `selectedGenre`.
3. A `watch` in `useShowsStore` detects the genre change and calls `resetPagination()` (page resets to 0, total record count is updated to match the newly filtered result set).
4. `filteredShows` and all downstream computeds (`pagedShows`, `showsByGenre`) recompute automatically — no additional network request is made.
5. The active genre is shown as a dismissible chip inside `GenreSelector`; clicking the × icon resets the filter back to _All shows_.

### 3. Navigate between pages

1. User clicks a page number, next, or previous in the `ShowsPagination` (PrimeVue `Paginator`) component.
2. The `@page` event fires and calls `usePaginationStore.setPage(newPage)`.
3. The `watch` in `useShowsStore` detects the page change and recomputes `pagedShows` from the already-loaded `filteredShows` slice — no network request is made.
4. `showsByGenre` updates and the dashboard re-renders the new page of shows.
5. When a genre filter is applied or cleared, pagination automatically resets to page 0 so the user always starts from the first page of the new result set.

### 3. View show details

1. User clicks a `ShowsTile` → `router.push('/show/:id')`.
2. `ShowsDetailsView` mounts with the route param `id` as a prop.
3. `onMounted` triggers `useShowDetailsStore.fetchShowDetails(id)`, which calls `GET /shows/:id`.
4. While loading, `ShowDetailsSkeleton` is displayed. When the response arrives, `ShowDetailsMain` renders the full information (image, rating, genres, information, summary, official site).
5. `ShowTabs` provides tabbed navigation (Main / Episodes / Photos) within the detail page.

---

## Project Setup

```sh
npm install
```

### Development server

```sh
npm run dev
```

This will run the application in [Localhost](http://localhost:5173/)

### Type-check, compile and minify for production

```sh
npm run build
```

### Unit tests

```sh
npm run test:unit
```

### Unit tests with coverage

```sh
npm run test:coverage
```

### End-to-end tests

```sh
# Install browsers (first run only)
npx playwright install

# Run all e2e tests
npm run test:e2e

# Run only on Chromium
npm run test:e2e -- --project=chromium
```

### Lint & format

```sh
npm run lint
npm run format
```

---
