<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import IconLocation from "@/components/icons/IconLocation.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const emit = defineEmits({
  selectCity(payload) {
    return payload;
  },
});

const isSelectVisible = ref(false);
const selectedCity = ref("London");

function onShowSelect() {
  isSelectVisible.value = true;
}

function onSelect() {
  emit("selectCity", selectedCity.value);
  isSelectVisible.value = false;
}

onBeforeMount(() => {
  emit("selectCity", selectedCity.value);
});
</script>

<template>
  <div class="app-city-select">
    <Button v-show="!isSelectVisible" label="Select a city" @click="onShowSelect">
      <template #icon>
        <IconLocation />
      </template>
    </Button>
    <div v-show="isSelectVisible" class="app-city-select__input">
      <Input v-model="selectedCity" placeholder="Enter city" />
      <Button @click="onSelect" />
    </div>
  </div>
</template>

<style scoped>
.app-city-select {
  width: 26.25rem;
}

.app-city-select__input {
  display: flex;
  gap: 0.75rem;
}
</style>
