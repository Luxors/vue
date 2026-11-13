<script setup lang="ts">
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categories.store.ts';

import IconPlus from '@/components/IconPlus.vue';
import BaseButton from '@/components/BaseButton.vue';

const store = useCategoryStore();

onMounted(async () => {
  await store.fetchCategories();
});
</script>

<template>
  <ul v-if="store.categories?.length" class="categories-list">
    <li v-for="category in store.categories" :key="category.id">
      <RouterLink
        :to="`/main/${category.alias}`"
        active-class="categories-list__link--active"
        class="categories-list__link"
      >
        {{ category.name }}
      </RouterLink>
    </li>
  </ul>
  <BaseButton @click="store.createCategory">
    <template #icon>
      <IconPlus />
    </template>
  </BaseButton>
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

.categories-list__link--active {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
