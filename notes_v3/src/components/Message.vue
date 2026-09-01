<script setup lang="ts">
export interface Props {
  message: string;
}

defineProps<Props>();
</script>

<template>
  <div class="message">
    <p>{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.message {
  text-align: center;
  padding: 20px;
}
p {
  color: #ba3838;
}
</style>
