<script setup lang="ts">
const { label = "Save" } = defineProps({
  label: String,
});
</script>

<template>
  <button type="button" class="app-button">
    <slot name="icon" />
    <span class="app-button__label">{{ label }}</span>
  </button>
</template>

<style lang="css" scoped>
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.563rem;
  width: 100%;
  padding: 0.875rem;
  font-family: var(--font-base);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  border: none;
  border-radius: 0.625rem;
  background: var(--l-gradient);
  cursor: pointer;
}

.app-button:hover {
  background: var(--l-gradient-inverted);
}
</style>
