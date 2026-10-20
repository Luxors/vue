<script setup lang="ts">
import IconSun from "@/components/icons/IconSun.vue";
import IconCloud from "@/components/icons/IconCloud.vue";
import IconRain from "@/components/icons/IconRain.vue";

const { weatherCode, temp, date } = defineProps({
  weatherCode: Number,
  temp: Number,
  date: Date,
  isActive: Boolean,
});
</script>

<template>
  <button type="button" class="app-day-card" :class="{ 'app-day-card--active': isActive }">
    <div class="app-day-card__icon">
      <IconSun v-if="weatherCode <= 1003" />
      <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" />
      <IconRain v-if="weatherCode >= 1063" />
    </div>
    <div class="app-day-card__date">
      {{ date?.toLocaleDateString("en-EN", { weekday: "short" }) }}
    </div>
    <div class="app-day-card__temp">{{ temp }} &deg;C</div>
  </button>
</template>

<style scoped>
.app-day-card {
  padding: 1rem;
  color: var(--color-primary);
  background-color: var(--color-bg-card);
  border: none;
  border-radius: 0.5rem;
}

.app-day-card--active {
  background-color: var(--color-primary);
  color: var(--color-primary-inverted);
}

.app-day-card:not(.app-day-card--active):hover {
  background-color: var(--color-bg);
  cursor: pointer;
}

.app-day-card__icon {
  margin-bottom: 0.15rem;
  font-size: 2.5rem;
}

.app-day-card__date {
  margin-bottom: 0.75rem;
  font-size: 0.625rem;
  text-transform: uppercase;
}

.app-day-card__temp {
  font-size: 1rem;
  font-weight: 600;
}
</style>
