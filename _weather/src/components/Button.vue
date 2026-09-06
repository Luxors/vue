<script setup lang="ts">
</script>
<template>
  <button
    type="button"
    class="app-button"
  >
    Save
  </button>
</template>

<style lang="css" scoped>
.app-button {
  padding: 0.875rem;
  font-family: var(--font-base);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  border: none;
  border-radius: 10px;
  background: var(--l-gradient);
  cursor: pointer;
}

.app-button:hover {
  background: var(--l-gradient-inverted);
}
</style>
