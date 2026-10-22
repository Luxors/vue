<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";

import { type ApiError } from "@/components/Error.vue";

import { cityProvide } from "@/injection-keys.ts";

import PainLeft from "@/components/PainLeft.vue";
import PainRight from "@/components/PainRight.vue";

const API_ENDPOINT = "https://api.weatherapi.com/v1";

const data = ref();
const error = ref<ApiError>();
const selectedCity = ref("London");
const selectedDayIndex = ref(0);

provide(cityProvide, selectedCity);

async function onSelectCity(city: string) {
  const params = new URLSearchParams({
    q: city,
    lang: "en",
    key: "9b389974c3ae45d4a50202506261810",
    days: "3",
  });

  const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`);
  if (res.status !== 200) {
    error.value = await res.json();
    data.value = null;
    return;
  }
  data.value = await res.json();
  console.log(data.value);
}

watch(selectedCity, () => {
  onSelectCity(selectedCity.value);
});

onMounted(() => {
  onSelectCity(selectedCity.value);
});
</script>

<template>
  <main class="app-main">
    <PainLeft :data :day-index="selectedDayIndex" />
    <PainRight
      :data
      :error
      :active-index="selectedDayIndex"
      @select-index="(i) => (selectedDayIndex = i)"
    />
  </main>
</template>

<style scoped>
.app-main {
  display: flex;
  align-items: center;
}
</style>
