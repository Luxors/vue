<script setup lang="ts">
import { computed, reactive } from "vue";

import Stat from "@/components/Stat.vue";
import CitySelect from "@/components/CitySelect.vue";

const data = reactive({
  humidity: "90",
  precipitation: "0",
  wind: "3",
});

const dataModified = computed(() => [
  {
    term: "humidity",
    descr: data.humidity + "%",
  },
  {
    term: "precipitation",
    descr: data.precipitation + "%",
  },
  {
    term: "wind",
    descr: data.wind + " m/s",
  },
]);

function onSelectCity(e: string) {
  console.log(e);
  data.humidity = "20";
  data.precipitation = "50";
  data.wind = "8";
}
</script>

<template>
  <main class="app-main">
    <div class="app-main__left">
      <Stat v-for="{ term, descr } in dataModified" :key="term" :term="term" :descr="descr" />
      <CitySelect @select-city="onSelectCity" />
    </div>
  </main>
</template>

<style scoped>
.app-main__left {
  padding: 1.25rem;
  background-color: var(--color-bg-main);
  border-radius: 1.563rem;
}
</style>
