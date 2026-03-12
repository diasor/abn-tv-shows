<script setup lang="ts">
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

interface IShowTabsProps {
  tabSelected: string;
}
const props = defineProps<IShowTabsProps>();

const tabId = ref(props.tabSelected);
</script>

<template>
  <Tabs :value="tabId" class="tv-show-tabs">
    <TabList>
      <Tab value="0" as="div" class="tab">
        <i class="pi pi-home" />
        <span>Main</span>
      </Tab>
      <Tab value="1" as="div" class="tab">
        <i class="pi pi-list" />
        <span>Episodes</span>
      </Tab>
      <Tab value="2" as="div" class="tab">
        <i class="pi pi-camera" />
        <span>Photos</span>
      </Tab>
    </TabList>
    <TabPanels class="tv-show-tabpanels">
      <TabPanel value="0" as="div" class="m-0">
        <slot name="main">Default main content</slot>
      </TabPanel>
      <TabPanel value="1" as="div" class="m-0">
        <slot name="episodes">Default episodes content</slot>
      </TabPanel>
      <TabPanel value="2" as="div" class="m-0">
        <slot name="photos">Default photos content</slot>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.tv-show-tabs {
  border-radius: 0.5rem !important;
  background: $background-gradient;
  box-shadow: $box-shadow-gradient;

  :deep(.p-tabs),
  :deep(.p-tablist),
  :deep(.p-tablist-content),
  :deep(.p-tabpanels) {
    background: $background-gradient !important;
  }

  :deep(.p-tabpanels) {
    font-size: 1rem;
    color: $color-lilac-dark;
  }

  /* remove PrimeVue default green active indicator */
  :deep(.p-tablist-active-bar) {
    background: $color-lilac-darker !important;
  }

  :deep(.p-tab) {
    border-bottom: 0 !important;
  }
  :deep(.p-tab-active) {
    border-bottom: 3px solid $color-lilac-darker !important;
  }
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.9rem;
  font-weight: 400;
  font-family: $font-playful !important;
  color: $color-lilac-dark !important;
}

.tv-show-tabpanels {
  padding: 1rem;
  :deep(.p-tabpanels) {
    font-size: 1rem;
    color: $color-lilac-dark;
  }

  :deep(.p-tabpanels) {
    background: $background-gradient !important;
  }
}
</style>
