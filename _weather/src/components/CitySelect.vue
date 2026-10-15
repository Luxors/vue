<script setup lang="ts">
import IconLocation from "@/components/icons/IconLocation.vue";
import Button from "@/components/Button.vue";

const emit = defineEmits({
  selectCity(payload) {
    return payload;
  },
});

function onSelect() {
  emit("selectCity", "London");
}
</script>

<template>
  <Button label="Select a city" @click="onSelect">
    <template #icon>
      <IconLocation />
    </template>
  </Button>
  <input />
  <Button />
</template>
