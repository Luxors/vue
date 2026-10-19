<script setup lang="ts">
import { computed } from "vue";

export interface ApiError {
  error: {
    code: number;
    message: string;
  };
}

interface Props {
  error: ApiError;
}

const props = defineProps<Props>();

const errorMap = new Map([[1006, "No matching location found."]]);

const errorDisplay = computed(() => {
  return errorMap.get(props.error?.error?.code);
});
</script>

<template>
  <div v-if="error" class="app-error">
    {{ errorDisplay }}
  </div>
</template>

<style scoped>
.app-error {
  margin-bottom: 1.875rem;
  padding: 0.938rem;
  font-size: 1.125rem;
  text-align: center;
  background-color: var(--color-bg-card);
  border-radius: 0.625rem;
}
</style>
