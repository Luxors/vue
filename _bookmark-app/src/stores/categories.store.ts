import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import type { Category } from '@/types';

import { API_ROUTES, client } from '@/api';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data } = await client().get<Category[]>(API_ROUTES.categories);
    categories.value = data;
  }

  async function createCategory() {
    const { data } = await client().post<Category>(API_ROUTES.categories, {
      name: 'New Category',
      alias: uuidv4(),
    });
    categories.value.push(data);
  }

  async function updateCategory(name: string, alias: string, id: number) {
    await client().put<Category>(API_ROUTES.categories + '/' + id, {
      name,
      alias,
    });
    fetchCategories();
  }

  async function deleteCategory(id: number) {
    await client().delete<Category>(API_ROUTES.categories + '/' + id);
    fetchCategories();
  }

  function getCategoryByAlias(alias: string | string[]): Category | undefined {
    if (typeof alias == 'string') {
      return categories.value.find((category) => category.alias === alias);
    }
    return;
  }

  return {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByAlias,
  };
});
