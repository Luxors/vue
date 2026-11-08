<script setup lang="ts">
import { onMounted } from 'vue';
import { useCategoryStore } from '../stores/categories.store.ts';

const store = useCategoryStore();

onMounted(async () => {
  await store.fetchCategories();
});
</script>

<template>
  <ul v-if="store.categories?.length" class="categories-list">
    <li v-for="category in store.categories" :key="category.id">
      <a :href="`/${category.allias}`" class="categories-list__link">{{ category.name }}</a>
    </li>
  </ul>
</template>

<style scoped>
.categories-list {
  display: flex;
  flex-direction: column;
  gap: 2.125rem;
}

.categories-list__link {
  font-size: 0.875rem;
  text-transform: capitalize;
  transition: all 0.5s;
}

.categories-list__link:hover {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
