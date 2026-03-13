<script setup lang="ts">
import Card from 'primevue/card';
import AboutItem from '@/components/about/AboutItem.vue';
import AboutImages from '@/components/about/AboutImages.vue';
import DocumentationIcon from '@/components/about/icons/IconDocumentation.vue';
import ToolingIcon from '@/components/about/icons/IconTooling.vue';
import EcosystemIcon from '@/components/about/icons/IconEcosystem.vue';
import SupportIcon from '@/components/about/icons/IconSupport.vue';

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
        <a href="https://api.tvmaze.com" target="_blank" rel="noopener">TVMaze public API</a>. Users
        can browse a paginated catalogue of shows, filter by genre, and open a dedicated details
        page for each show with information such as rating, schedule, genres, language, premiere
        date, and a summary.
        <br />
        The application is built with
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3 framework</a> (Composition
        API),
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a>, and
        <a href="https://www.primefaces.org/primevue/" target="_blank" rel="noopener">PrimeVue</a>.
        Is designed to be fully responsive, allowing the same screens from Desktop view to mobile
        devices.
      </AboutItem>

      <AboutItem>
        <template #icon>
          <ToolingIcon />
        </template>
        <template #heading>Tooling</template>

        This project is served and bundled with
        <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
        components, composables and web pages (views) were unit tested with
        <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest</a>. The end to end
        testing was automated with
        <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a>.

        <br />

        More instructions are available in
        <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a
        >.
      </AboutItem>

      <AboutItem>
        <template #icon>
          <EcosystemIcon />
        </template>
        <template #heading>Ecosystem</template>

        The project was implemented using the official and recommended libraries from the Vue
        ecosystem, such as:
        <ul>
          <li>
            State management with
            <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>.
          </li>
          <li>
            Routing with
            <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>. Also,
            the router was implemented with lazy loading to reduce bundle size.
          </li>
          <li>
            Testing with
            <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a
            >.
          </li>
          <li>
            Debugging with
            <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener"
              >Vue Dev Tools</a
            >.
          </li>
          <li>
            Fetching data with
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
              target="_blank"
              rel="noopener"
              >Fetch API</a
            >.
          </li>
          <li>
            SASS
            <a href="https://sass-lang.com/documentation/" target="_blank" rel="noopener"
              >SASS Documentation</a
            >.
          </li>
        </ul>
      </AboutItem>

      <AboutItem>
        <template #icon>
          <SupportIcon />
        </template>
        <template #heading>Responsiveness</template>
        The application is fully responsive. It can fit the smallest devices and adjusts correctly,
        as needed.
        <AboutImages />
      </AboutItem>

      <AboutItem>
        <template #icon>
          <SupportIcon />
        </template>
        <template #heading>Architechture</template>
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
}
</style>
