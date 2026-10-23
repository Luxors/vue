<script setup lang="ts">
import IconSun from "@/components/icons/IconSun.vue";
import IconCloud from "@/components/icons/IconCloud.vue";
import IconRain from "@/components/icons/IconRain.vue";

const { weatherCode } = defineProps({
  weatherCode: Number,
});
</script>

<template>
<div>
  <IconSun v-if="weatherCode !== undefined && weatherCode <= 1003" />
  <IconCloud v-if="weatherCode !== undefined && weatherCode >= 1006 && weatherCode < 1063" />
  <IconRain v-if="weatherCode !== undefined && weatherCode >= 1063" />
</div>
</template>

<style lang="css" scoped>

</style>
