<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<template>
  <button type="button" class="base-button">
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  display: inline-block;
  height: 3.125rem;
  padding: 0.75rem 2.75rem;
  font-size: 1.125rem;
  color: var(--color-bg);
  line-height: 1;
  background-color: var(--color-fg);
  border-radius: 3.125rem;
  border: none;
  cursor: pointer;
}
</style>
