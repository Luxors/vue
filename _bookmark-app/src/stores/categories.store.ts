import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { Category } from '@/types';

import { API_ROUTES, http } from '@/api';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data } = await http.get<Category[]>(API_ROUTES.categories);
    categories.value = data;
  }

  return {
    categories,
    fetchCategories,
  };
});
