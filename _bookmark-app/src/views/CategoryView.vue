<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { Category } from '@/types';

import { useCategoryStore } from '@/stores/categories.store.ts';
import { useBookmarkStore } from '@/stores/bookmark.store.ts';

import CategoryHeader from '@/components/CategoryHeader.vue';
import BookmarkCard from '@/components/BookmarkCard.vue';

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
    <BookmarkCard :id="1" title="string" url="hsafsjfd" />
    <div v-if="bookmarkStore.bookmarks.length">
      <BookmarkCard
        v-for="bookmark in bookmarkStore.bookmarks"
        :key="bookmark.id"
        :id="bookmark.id"
        :title="bookmark.title"
        :url="bookmark.url"
      />
    </div>
  </div>
</template>

<style scoped></style>
