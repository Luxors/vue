<script setup lang="ts">
import { watch, ref } from 'vue';
import type { Category } from '@/types';

import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categories.store.ts';

import BaseButton from '@/components/BaseButton.vue';
import IconTrash from '@/components/IconTrash.vue';
import IconEdit from '@/components/IconEdit.vue';
import IconCheck from '@/components/IconCheck.vue';
import BaseInput from './BaseInput.vue';

const { category } = defineProps<{
  category: Category;
}>();

const router = useRouter();
const categoryStore = useCategoryStore();

const categoryName = ref(category.name);
const isEdited = ref(false);

function toggleEdit() {
  isEdited.value = !isEdited.value;
  if (isEdited.value) {
    categoryName.value = category.name;
  }
}

function updateCategory() {
  if (!categoryName.value) return;
  categoryStore.updateCategory(categoryName.value, category.alias, category.id);
  toggleEdit();
}

function deleteCategory() {
  categoryStore.deleteCategory(category.id);
  router.push({ name: 'main' });
}

watch(
  () => category.id,
  () => {
    isEdited.value = false;
  },
);
</script>

<template>
  <header class="category-header">
    <div class="category-header__caption">
      <h1 v-show="!isEdited" class="category-header__title">{{ category.name }}</h1>
      <div v-show="isEdited" class="category-header__form">
        <BaseInput v-model="categoryName" class="category-header__input" />
        <BaseButton @click="updateCategory">
          <template #icon>
            <IconCheck />
          </template>
        </BaseButton>
      </div>
    </div>
    <div class="category-header__toolbar">
      <BaseButton @click="toggleEdit">
        <template #icon>
          <IconEdit />
        </template>
      </BaseButton>
      <BaseButton @click="deleteCategory">
        <template #icon>
          <IconTrash />
        </template>
      </BaseButton>
    </div>
  </header>
</template>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.category-header__caption {
}

.category-header__form {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-header__input {
  align-self: stretch;
}

.category-header__toolbar {
  display: flex;
  gap: 1rem;
}
</style>
