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
│   └── show-list/    # Components for the show catalogue (ShowsTile, etc.)
├── router/           # Vue Router configuration (3 routes: dashboard, show-details, about)
├── schemas/          # TypeScript types / Zod schemas for TVShow & TVShowDetails
├── shared/
│   └── api/          # fetchClient utility + API constants (base URL, limits, N/A fallback)
├── stores/
│   ├── useShowsStore.ts        # Catalogue state: list, genre filter, pagination
│   └── useShowDetailsStore.ts  # Single-show state: selected show, loading flag
├── test/             # Vitest global setup (mocks, stubs, directives)
└── views/
    ├── ShowsDashboardView.vue  # Catalogue page
    ├── ShowsDetailsView.vue    # Detail page
    └── AboutView.vue           # About page
```

**Data flow:** Views consume Pinia stores → stores call `fetchClient` → `fetchClient` wraps the native `fetch` API against the TVMaze REST API.

---

## Main Flows

### 1. Browse the shows catalogue

1. User navigates to `/` → `ShowsDashboardView` mounts.
2. `onMounted` triggers `useShowsStore.fetchShows()`, which calls `GET /shows?page=<n>&limit=20` on the TVMaze API.
3. The store writes the result into `shows` and exposes `visibleShows` (computed, filtered by `selectedGenre`).
4. `ShowsTile` components render for each show in `visibleShows`.

### 2. Filter shows by genre

1. User selects a genre from the menu via `TheMenu`.
2. `selectedGenre` in `useShowsStore` is updated.
3. `visibleShows` recomputes automatically — no additional network request is made.

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
