<script setup lang="ts">
import type { Bookmark } from '@/types';

import IconTrash from '@/components/IconTrash.vue';
import IconLink from '@/components/IconLink.vue';
import BaseButton from '@/components/BaseButton.vue';

const { id, title, image, url } = defineProps<Bookmark>();
</script>

<template>
  <article class="bookmark-card">
    <img :src="image" :alt="title" class="bookmark-card__image" />
    <h4 class="bookmark-card__title">{{ title }}</h4>
    <footer class="bookmark-card__footer">
      <BaseButton bordered>
        <template #icon>
          <IconTrash />
        </template>
      </BaseButton>
      <BaseButton bordered>
        <template #icon>
          <IconLink />
        </template>
      </BaseButton>
    </footer>
  </article>
</template>

<style scoped>
.bookmark-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 25rem;
  padding: 1.25rem;
  background-color: var(--color-fg);
  border-radius: 1.875rem;
}

.bookmark-card__image {
  min-height: 10rem;
  object-fit: cover;
  border-radius: 1.25rem;
}

.bookmark-card__title {
  color: var(--color-bg);
  font-weight: 500;
}

.bookmark-card__footer {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
</style>
