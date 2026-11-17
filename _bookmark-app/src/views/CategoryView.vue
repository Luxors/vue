<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Category } from '@/types';

import { useCategoryStore } from '@/stores/categories.store.ts';
import { useBookmarkStore } from '@/stores/bookmark.store.ts';

const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();

const category = ref<Category>();

watch(
  () => ({
    alias: route.params.alias,
    categories: categoryStore.categories,
  }),
  (data) => {
    category.value =
      data.alias === undefined ? undefined : categoryStore.getCategoryByAlias(data.alias);
    if (category.value) {
      bookmarkStore.fetchBookmarks(category.value.id);
    }
  },
);
</script>

<template>
  <div>
    <h1>{{ category?.name }}</h1>
    <div>{{ bookmarkStore.bookmarks.length }} bookmarks</div>
  </div>
</template>

<style scoped></style>
