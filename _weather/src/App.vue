<script setup lang="ts">
import Stat from "@/components/Stat.vue";
import CitySelect from "@/components/CitySelect.vue";
</script>

<template>
  <main class="app-main">
    <div class="app-main__left">
      <Stat term="Humidity" descr="90%" />
      <Stat term="Precipitation" descr="0%" />
      <CitySelect />
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
