<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Category } from '@/types';

import { useCategoryStore } from '@/stores/categories.store.ts';

const route = useRoute();
const store = useCategoryStore();
const category = ref<Category>();

watch(
  () => ({
    alias: route.params.alias,
    categories: store.categories,
  }),
  (data) => {
    category.value = data.alias === undefined ? undefined : store.getCategoryByAlias(data.alias);
  },
);
</script>

<template>
  <div>
    <h1>{{ category?.name }}</h1>
  </div>
</template>

<style scoped></style>
