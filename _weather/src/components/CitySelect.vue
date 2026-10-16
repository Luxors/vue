<script setup lang="ts">
import { ref } from "vue";

import IconLocation from "@/components/icons/IconLocation.vue";
import Button from "@/components/Button.vue";

const emit = defineEmits({
  selectCity(payload) {
    return payload;
  },
});

const isSelectVisible = ref(false);

function onShowSelect() {
  isSelectVisible.value = true;
}

function onSelect() {
  emit("selectCity", "London");
  isSelectVisible.value = false;
}
</script>

<template>
  <Button label="Select a city" @click="onShowSelect">
    <template #icon>
      <IconLocation />
    </template>
  </Button>
  <div v-if="isSelectVisible">
    <input />
    <Button @click="onSelect" />
  </div>
</template>
