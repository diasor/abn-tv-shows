<script setup lang="ts">
interface IProps {
  text: string;
  href: string;
  linkText: string;
  imageSrc: string;
  imageAlt: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="item">
    <span class="list-item-with-icon">
      <img v-if="props.imageSrc" :src="props.imageSrc" :alt="props.imageAlt" class="inline-logo" />
      <a :href="props.href" target="_blank" rel="noopener"> {{ props.linkText }} </a>
      {{ props.text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.list-item-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.inline-logo {
  height: 2.5rem;
  width: auto;
  display: inline-block;
  border-radius: 1rem;
}
</style>
