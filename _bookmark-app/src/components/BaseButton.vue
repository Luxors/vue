<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  label?: string;
  bordered?: boolean;
}

const props = defineProps<Props>();

const cssClasses = computed(() => ({
  'base-button--label': !!props.label,
  'base-button--bordered': !!props.bordered,
}));
</script>

<template>
  <button type="button" class="base-button" :class="cssClasses">
    <slot name="icon" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-block;
  width: 3.125rem;
  height: 3.125rem;
  font-size: 1.125rem;
  color: var(--color-bg);
  line-height: 1;
  background-color: var(--color-fg);
  border-radius: 100%;
  border: none;
  cursor: pointer;
}

.base-button--label {
  padding: 0.75rem 2.75rem;
  width: auto;
  border-radius: 3.125rem;
}

.base-button--bordered {
  border: 2px solid var(--color-bg);
}
</style>
