<script setup lang="ts">
import { inject, ref } from "vue";

import { cityProvide } from "@/injection-keys.ts";

import IconLocation from "@/components/icons/IconLocation.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const city = inject(cityProvide, ref(""));

const inputValue = ref(city.value);
const isSelectVisible = ref(false);

function onShowSelect() {
  isSelectVisible.value = true;
}

function onSelect() {
  isSelectVisible.value = false;
  city.value = inputValue.value;
}
</script>

<template>
  <div class="app-city-select">
    <Button v-show="!isSelectVisible" label="Select a city" @click="onShowSelect">
      <template #icon>
        <IconLocation />
      </template>
    </Button>
    <div v-show="isSelectVisible" class="app-city-select__input">
      <Input v-model="inputValue" placeholder="Enter city" />
      <Button @click="onSelect" />
    </div>
  </div>
</template>

<style scoped>
.app-city-select {
  width: 17rem;
}

.app-city-select__input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
}
</style>
