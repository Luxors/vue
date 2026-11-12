import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import type { Category } from '@/types';

import { API_ROUTES, http } from '@/api';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data } = await http.get<Category[]>(API_ROUTES.categories);
    categories.value = data;
  }

  async function createCategory() {
    const { data } = await http.post<Category>(API_ROUTES.categories, {
      name: 'New Category',
      alias: uuidv4(),
    });

    categories.value.push(data);
  }

  return {
    categories,
    fetchCategories,
    createCategory,
  };
});
