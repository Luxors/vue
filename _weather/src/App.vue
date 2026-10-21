<script setup lang="ts">
import { computed, ref } from "vue";

import { type ApiError } from "@/components/Error.vue";

import Stat from "@/components/Stat.vue";
import CitySelect from "@/components/CitySelect.vue";
import Error from "@/components/Error.vue";
import DayCard from "@/components/DayCard.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconSun from "@/components/icons/IconSun.vue";

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
    <div class="app-main__right">
      <div>
        <p class="app-data-current__weekday">Tuesday</p>
        <p class="app-data-current__date">{{ new Date().toLocaleDateString() }}</p>
        <div class="app-data-current__location">
          <IconLocation />
          <span>{{ data?.location.name }}</span>
        </div>
      </div>
      <div>
        <IconSun class="app-data-current__icon" />
        <p class="app-data-current__temp">{{ data?.current.temp_c }} &deg;C</p>
        <p class="app-data-current__condition">{{ data?.current.condition.text }}</p>
      </div>
    </div>
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
            @click="() => (activeDayCard = Number(i))"
          />
        </div>
      </div>
      <CitySelect @select-city="onSelectCity" />
    </div>
  </main>
</template>

<style scoped>
.app-main {
  display: flex;
  align-items: center;
}
.app-main__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18rem;
  height: 27.5rem;
  padding: 2rem;
  background-image:
    linear-gradient(91deg, rgba(144, 217, 224, 0.8) 0.2%, rgba(84, 96, 230, 0.8) 100%),
    url("@/assets/beach.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1.563rem;
}

.app-data-current__weekday {
  font-size: 1.25rem;
  font-weight: 600;
}

.app-data-current__date {
  font-size: 0.875rem;
}

.app-data-current__location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.app-data-current__icon {
  font-size: 3rem;
}

.app-data-current__temp {
  font-size: 2rem;
  font-weight: 600;
}

.app-data-current__condition {
  font-weight: 600;
}

.app-main__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  height: 25rem;
  padding: 0 2rem;
  background-color: var(--color-bg-main);
  border-radius: 0 1.563rem 1.563rem 0;
}

.app-main__data {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.app-main__daycards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
</style>
