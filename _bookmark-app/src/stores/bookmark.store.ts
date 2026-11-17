import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { Bookmark } from '@/types';

import { API_ROUTES, http } from '@/api';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Bookmark[]>([]);

  async function fetchBookmarks(categoryId: number) {
    const { data } = await http.get<Bookmark[]>(API_ROUTES.bookmarks(categoryId));
    bookmarks.value = data;
  }

  return {
    bookmarks,
    fetchBookmarks,
  };
});
