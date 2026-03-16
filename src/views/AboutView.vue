<script setup lang="ts">
import Card from 'primevue/card';
import AboutItem from '@/components/about/AboutItem.vue';
import AboutImages from '@/components/about/AboutImages.vue';
import AboutToolItem from '@/components/about/AboutToolItem.vue';
import DocumentationIcon from '@/components/about/icons/IconDocumentation.vue';
import ToolingIcon from '@/components/about/icons/IconTooling.vue';
import EcosystemIcon from '@/components/about/icons/IconEcosystem.vue';
import SupportIcon from '@/components/about/icons/IconSupport.vue';
import ArchitectureIcon from '@/components/about/icons/IconArchitecture.vue';

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md');
</script>

<template>
  <Card class="about-card">
    <template #title>
      <h1>About the application</h1>
    </template>
    <template #content>
      <AboutItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>Documentation</template>
        This is a single-page application that lets users browse and explore TV shows sourced from
        the
        <a href="https://api.tvmaze.com" target="_blank" rel="noopener">TVMaze public API</a>. The
        main features are:
        <ul>
          <li>Browse a catalogue of tv shows.</li>
          <li>Group the tv shows by genre, showing each genre separately.</li>
          <li>Display the tv shows in rating order, by genre.</li>
          <li>Filter the tv shows by genre</li>
          <li>Paginate the tv shows for easier browsing.</li>
          <li>
            Show a skeleton loader while the tv show list is being fetched, for better user
            experience.
          </li>
          <li>
            Open a dedicated details page for each tv show, displaying:
            <ul>
              <li>Tv show name</li>
              <li>Image</li>
              <li>Summary</li>
              <li>Language</li>
              <li>Rating</li>
              <li>Schedule</li>
              <li>Genres</li>
              <li>Status</li>
              <li>Premiere date</li>
            </ul>
          </li>
          <li>
            Show a tab with the episodes of the TV show. A list of episodes is displayed with
            details such as episode number, name, airdate, and rating.
          </li>
          <li>Zooming into the tv show image.</li>
          <li>
            Show a skeleton loader while the tv show details are being fetched, for better user
            experience.
          </li>
        </ul>
        <br />
        The application is created to be fully responsive, allowing the same screens from Desktop
        view to mobile devices.
      </AboutItem>
      <AboutItem>
        <template #icon>
          <EcosystemIcon />
        </template>
        <template #heading>Ecosystem and tooling</template>
        The project was implemented using:
        <ul>
          <li>
            <AboutToolItem
              href="https://vuejs.org/"
              linkText="Vue 3 framework"
              text="setup script and composition API"
              imageSrc="/tooling/vue-logo.svg"
              imageAlt="Vue logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://www.typescriptlang.org/"
              linkText="TypeScript"
              text="for type safety and better developer experience."
              imageSrc="/tooling/typescript-logo.svg"
              imageAlt="TypeScript logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://www.primefaces.org/primevue/"
              linkText="PrimeVue"
              text="for UI components library, icons and styling."
              imageSrc="/tooling/primevue-logo.png"
              imageAlt="PrimeVue logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://pinia.vuejs.org/"
              linkText="Pinia"
              text="for state management, with the composition API and dev tools support."
              imageSrc="/tooling/pinia-logo.png"
              imageAlt="Pinia logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://router.vuejs.org/"
              linkText="Vue Router"
              text="for routing with lazy loading to reduce bundle size."
              imageSrc=""
              imageAlt=""
            />
          </li>
          <li>
            <AboutToolItem
              href="https://sass-lang.com/documentation/"
              linkText="SASS"
              text="for styling and theming."
              imageSrc="/tooling/sass-logo.svg"
              imageAlt="SASS logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://github.com/vuejs/devtools"
              linkText="Vue DevTools"
              text="for debugging."
              imageSrc="/tooling/vue-devtools-logo.svg"
              imageAlt="Vue DevTools logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://vite.dev/"
              linkText="Vite"
              text="for development and bundling."
              imageSrc="/tooling/vite-logo.svg"
              imageAlt="Vite logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
              linkText="Fetch API"
              text="for handling asynchronous operations, such as API calls."
              imageSrc=""
              imageAlt=""
            />
          </li>
        </ul>
      </AboutItem>

      <AboutItem>
        <template #icon>
          <ToolingIcon />
        </template>
        <template #heading>Testing strategy</template>

        This project was implemented following the
        <a
          href="https://dev.to/misterankit/mastering-the-test-pyramid-a-comprehensive-guide-for-software-teams-1kbf"
          target="_blank"
          rel="noopener"
        >
          Test Pyramid framework</a
        >, which promotes a balanced approach to testing. This emphasizes a large base of unit tests
        and fewer UI end-to-end tests. The tools used for testing are:
        <ul>
          <li>
            <AboutToolItem
              href="https://vitest.dev/"
              linkText="Vitest"
              text="for unit testing."
              imageSrc="/tooling/vitest-logo.svg"
              imageAlt="Vitest logo"
            />
          </li>
          <li>
            <AboutToolItem
              href="https://playwright.dev/"
              linkText="Playwright"
              text="for end-to-end testing."
              imageSrc="/tooling/playwright-logo.svg"
              imageAlt="Playwright logo"
            />
          </li>
        </ul>
        The components, composables and web pages (views) were unit tested with a goal of 85%. By
        the this documentation was done, the coverage was as follows:
        <img
          src="/tests/unit-test-results.png"
          alt="Test coverage report"
          style="max-width: 100%"
          class="about-images"
        />

        <br />

        The main flows of the application were end-to-end tested following the Page Object Model
        (POM) design pattern. POM is an end-to-end (E2E) testing design pattern that creates an
        object repository for web UI elements, enhancing maintainability and reducing code
        duplication.
        <h3>Dashboard e2e tests</h3>
        The tests cover scenarios such as browsing the catalogue, filtering by genre, and opening a
        show's details page. The test coverage for the dashboard is around 80% and the report is as
        follows:
        <img
          src="/tests/e2e-dashboard-testing.png"
          alt="Test coverage report"
          style="max-width: 100%"
          class="about-images"
        />

        <h3>Details' page e2e tests</h3>
        The tests cover scenarios such as opening a show's details page, and checking that the
        information is displayed correctly. The test coverage for the details' page is around 90%
        and the report is as follows:
        <img
          src="/tests/e2e-details-testing.png"
          alt="Test coverage report"
          style="max-width: 100%"
          class="about-images"
        />
        More instructions are available in
        <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a
        >.
      </AboutItem>

      <AboutItem>
        <template #icon>
          <SupportIcon />
        </template>
        <template #heading>Responsiveness</template>
        The application is fully responsive. It can fit the smallest devices and adjusts correctly,
        as needed. Here is a showcase of the application on different screen sizes:
        <AboutImages />
      </AboutItem>

      <AboutItem>
        <template #icon>
          <ArchitectureIcon />
        </template>
        <template #heading>Architecture</template>
        The application follows a feature-based architecture, where each feature is self-contained
        and has its own components, stores, and views. The main layers are:
        <ul>
          <li>
            <strong>Views</strong> — Page-level components tied to routes (
            <code>ShowsDashboardView</code>, <code>ShowsDetailsView</code>, <code>AboutView</code>).
            Each view composes smaller components and reads from stores.
          </li>
          <li>
            <strong>Components</strong> — Organised by feature ( <code>show-list/</code>,
            <code>show-details/</code>, <code>base/</code>, <code>about/</code>). Components are
            presentational and receive data via props or slots.
          </li>
          <li>
            <strong>Stores (Pinia)</strong> — Handle all async data fetching and state management.
            Each domain has its own store: <code>useShowsStore</code>,
            <code>useShowDetailsStore</code>, <code>useGenreStore</code>, and
            <code>usePaginationStore</code>.
          </li>
          <li>
            <strong>Shared</strong> — Utility functions, genre helpers, and the API layer
            (<code>shared/api/</code>) that wraps <code>fetch</code> calls to the TVMaze API.
          </li>
          <li>
            <strong>Schemas</strong> — Dedicated schema files used for type validation of API
            responses, ensuring type safety at the application boundary.
          </li>
          <li>
            <strong>Router</strong> — Configured with lazy-loaded routes to reduce the initial
            bundle size.
          </li>
        </ul>

        <br />
        Data flows unidirectionally: views and components dispatch actions to stores, stores call
        the API layer, and reactive state is automatically reflected back in the UI via Vue's
        reactivity system.

        <img
          src="/architecture/architecture.png"
          alt="Architecture diagram"
          style="max-width: 100%"
          class="about-images"
        />
      </AboutItem>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.about-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;
  padding: 4rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    color: $color-lilac-darker;
    text-align: left;
  }
}

.about-images {
  display: block;
  margin: 1rem 0;
  border-radius: 1rem;
  border: 1.3px solid $color-lilac-darker;
}
</style>
