<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { Category } from '@/types';

import { useCategoryStore } from '@/stores/categories.store.ts';
import { useBookmarkStore } from '@/stores/bookmark.store.ts';

import CategoryHeader from '@/components/CategoryHeader.vue';

const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();

const category = computed<Category | undefined>(() => {
  const alias = route.params.alias;
  return typeof alias === 'string' ? categoryStore.getCategoryByAlias(alias) : undefined;
});

watch(
  category,
  (newCategory) => {
    if (newCategory?.id !== undefined) {
      bookmarkStore.fetchBookmarks(newCategory.id);
    }
  },
  { immediate: true },
);
</script>

<template>
  <CategoryHeader v-if="category" :category="category" />
  <div>
    <ul v-if="bookmarkStore.bookmarks.length">
      <li v-for="bookmark in bookmarkStore.bookmarks" :key="bookmark.id">
        <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
