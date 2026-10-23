<script setup lang="ts">
import { inject, computed, ref } from "vue";

import { cityProvide } from "@/injection-keys.ts";

import IconLocation from "@/components/icons/IconLocation.vue";
import ConditionIcons from "@/components/ConditionIcons.vue";

const city = inject(cityProvide, ref(""));

const { data, dayIndex } = defineProps({
  data: Object,
  dayIndex: Number,
});

const dayData = computed(() => data?.forecast.forecastday[dayIndex ?? 0]);
</script>

<template>
  <div v-if="dayData" class="app-pain-left">
    <div>
      <p class="app-pain-left__weekday">
        {{ new Date(dayData.date).toLocaleDateString("en-EN", { weekday: "long" }) }}
      </p>
      <p class="app-pain-left__date">
        {{
          new Date(dayData.date).toLocaleDateString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
      <div class="app-pain-left__location">
        <IconLocation />
        <span>{{ city }}</span>
      </div>
    </div>
    <div>
      <ConditionIcons :weather-code="dayData.day.condition.code" class="app-pain-left__icon" />
      <p class="app-pain-left__temp">{{ dayData.day.avgtemp_c }} &deg;C</p>
      <p class="app-pain-left__condition">{{ dayData.day.condition.text }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.app-pain-left {
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

.app-pain-left__weekday {
  font-size: 1.25rem;
  font-weight: 600;
}

.app-pain-left__date {
  font-size: 0.875rem;
}

.app-pain-left__location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.app-pain-left__icon {
  font-size: 3rem;
  line-height: 1;
}

.app-pain-left__temp {
  font-size: 2rem;
  font-weight: 600;
}

.app-pain-left__condition {
  font-weight: 600;
}
</style>
