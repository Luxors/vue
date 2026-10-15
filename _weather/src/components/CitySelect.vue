<script setup lang="ts">
import IconLocation from "@/components/icons/IconLocation.vue";
import Button from "@/components/Button.vue";
</script>

<template>
  <Button label="Select a city">
    <template #icon>
      <IconLocation />
    </template>
  </Button>
  <input />
  <Button />
</template>
