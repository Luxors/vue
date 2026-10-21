<script setup lang="ts">
const data = defineModel({ type: String, required: true });
</script>

<template>
  <input v-model="data" class="app-input" />
</template>

<style scoped>
.app-input {
  width: 100%;
  padding: 0.938rem 1.25rem;
  font-size: 1.125rem;
  color: var(--color-primary);
  background-color: var(--color-bg-card);
  border: none;
  border-radius: 0.625rem;
  box-shadow: 1px 2px 4px 0px var(--color-bg-main);
}

.app-input::placeholder {
  color: var(--color-text-placeholder);
}

.app-input:focus-visible {
  outline: 1px solid var(--color-text-placeholder);
}
</style>
