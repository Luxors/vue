<script setup lang="ts">
import { computed, ref } from "vue";

import { type ApiError } from "@/components/Error.vue";

import IconSun from "@/components/icons/IconSun.vue";
import IconCloud from "@/components/icons/IconCloud.vue";
import IconRain from "@/components/icons/IconRain.vue";

import Stat from "@/components/Stat.vue";
import CitySelect from "@/components/CitySelect.vue";
import Error from "@/components/Error.vue";

const API_ENDPOINT = "https://api.weatherapi.com/v1";

const data = ref();
const error = ref<ApiError>();

const dataModified = computed(() => {
  if (!data.value) return [];
  return [
    {
      term: "humidity",
      descr: data.value.current.humidity + "%",
    },
    {
      term: "precip",
      descr: data.value.current.precip_mm + " mm",
    },
    {
      term: "wind",
      descr: data.value.current.wind_kph + " k/h",
    },
  ];
});

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
}
</script>

<template>
  <main class="app-main">
    <div class="app-main__right">
      <IconSun />
      <IconCloud />
      <IconRain />
    </div>
    <div class="app-main__left">
      <Error v-if="error" :error="error" />
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
