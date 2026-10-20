<script setup lang="ts">
import { computed, ref } from "vue";

import { type ApiError } from "@/components/Error.vue";

import Stat from "@/components/Stat.vue";
import CitySelect from "@/components/CitySelect.vue";
import Error from "@/components/Error.vue";
import DayCard from "@/components/DayCard.vue";

const API_ENDPOINT = "https://api.weatherapi.com/v1";

const data = ref();
const error = ref<ApiError>();
const activeDayCard = ref(0);

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
  // console.log(res.json());
  if (res.status !== 200) {
    error.value = await res.json();
    data.value = null;
    return;
  }
  data.value = await res.json();
  console.log(data.value);
}
</script>

<template>
  <main class="app-main">
    <div class="app-main__right"></div>
    <div class="app-main__left">
      <div v-if="data" class="app-main__data">
        <Error v-if="error" :error="error" />
        <div>
          <Stat v-for="{ term, descr } in dataModified" :key="term" :term="term" :descr="descr" />
        </div>
        <div class="app-main__daycards">
          <DayCard
            v-for="(item, i) in data.forecast.forecastday"
            :key="item.date"
            :weather-code="item.day.condition.code"
            :temp="item.day.avgtemp_c"
            :date="new Date(item.date)"
            :is-active="activeDayCard === i"
            @click="() => (activeDayCard = i)"
          />
        </div>
      </div>
      <CitySelect @select-city="onSelectCity" />
    </div>
  </main>
</template>

<style scoped>
.app-main__left {
  padding: 2rem;
  background-color: var(--color-bg-main);
  border-radius: 1.563rem;
}

.app-main__data {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
}

.app-main__daycards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
</style>
