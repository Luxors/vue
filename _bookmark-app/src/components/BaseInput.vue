<script setup lang="ts">
const data = defineModel<string>();
</script>

<template>
  <input v-model="data" type="text" class="base-input" />
</template>

<style scoped>
.base-input {
  font-size: 1.5rem;
  color: var(--color-fg);
  border: none;
  border-bottom: 1px solid var(--color-fg);
  outline: none;
}

.base-input::placeholder {
  color: var(--color-disabled);
}
</style>
