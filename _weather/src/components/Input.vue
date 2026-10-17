<script setup lang="ts"></script>

<template>
  <input class="app-input" />
</template>

<style scoped>
.app-input {
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
