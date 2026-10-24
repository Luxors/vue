<script setup lang="ts">
import { computed, type PropType } from "vue";

import type { ApiError } from "@/components/Error.vue";

import Error from "@/components/Error.vue";
import Stat from "@/components/Stat.vue";
import DayCard from "@/components/DayCard.vue";
import CitySelect from "@/components/CitySelect.vue";

const { data, error, activeIndex } = defineProps({
  data: Object,
  error: Object as PropType<ApiError>,
  activeIndex: Number,
});

const emit = defineEmits(["select-index"]);

const statData = computed(() => {
  if (!data || activeIndex === undefined) return [];
  return [
    {
      term: "humidity",
      descr: data.forecast.forecastday[activeIndex].day.avghumidity + "%",
    },
    {
      term: "precip",
      descr: data.forecast.forecastday[activeIndex].day.totalprecip_mm + " mm",
    },
    {
      term: "wind",
      descr: data.forecast.forecastday[activeIndex].day.maxwind_kph + " k/h",
    },
  ];
});
</script>

<template>
  <div class="app-pain-right">
    <div v-if="data" class="app-pain-right__data">
      <div>
        <Stat v-for="{ term, descr } in statData" :key="term" :term="term" :descr="descr" />
      </div>
      <div class="app-pain-right__daycards">
        <DayCard
          v-for="(item, i) in data.forecast.forecastday"
          :key="item.date"
          :weather-code="item.day.condition.code"
          :temp="item.day.avgtemp_c"
          :date="new Date(item.date)"
          :is-active="activeIndex === i"
          @click="() => emit('select-index', Number(i))"
        />
      </div>
    </div>
    <Error v-else-if="error" :error="error" />
    <CitySelect />
  </div>
</template>

<style lang="css" scoped>
.app-pain-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  height: 25rem;
  padding: 1.5rem 2rem;
  background-color: var(--color-bg-main);
  border-radius: 0 1.563rem 1.563rem 0;
}

.app-pain-right__data {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.app-pain-right__daycards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
</style>
