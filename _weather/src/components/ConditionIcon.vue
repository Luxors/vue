<script setup lang="ts">
import { computed, ref } from 'vue';

import defaultFallbackImg from '@/assets/icons/cloud.svg';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Иконка'
  },
  size: {
    type: [Number, String],
    default: 64
  },
});

const hasError = ref(false);

const normalizedSrc = computed(() => {
  return props.src.startsWith('//') ? `https:${props.src}` : props.src;
});

const displaySrc = computed(() => {
  return hasError.value ? defaultFallbackImg : normalizedSrc.value;
});

function handleError() {
  if (!hasError.value) {
    hasError.value = true;
    console.warn(`[AppIcon] Не удалось загрузить изображение: ${props.src}`);
  }
};
</script>

<template>
  <img
    :src="displaySrc"
    alt="altText"
    :width="size"
    :height="size"
    class="app-condition-icon"
    @error="handleError"
  />
</template>

<style lang="css" scoped>

</style>
