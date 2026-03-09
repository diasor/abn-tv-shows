<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import { fetchClient } from '@/shared/api/fetchClient';

const fetchData = async () => {
  try {
    const data = await fetchClient('https://api.tvmaze.com/shows');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<template>
  <main>
    <Card>
      <template #title>TV Dashboard</template>
      <template #content>
        <Rating :modelValue="4.5" />
        <Button label="Fetch" @click="fetchData" />
      </template>
    </Card>
  </main>
</template>
