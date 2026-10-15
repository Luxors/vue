<script setup lang="ts">
import IconLocation from "@/components/icons/IconLocation.vue";
import Stat from "@/components/Stat.vue";
import Button from "@/components/Button.vue";
</script>

<template>
  <main class="app-main">
    <div class="app-main__left">
      <Stat term="Humidity" descr="90%" />
      <Stat term="Precipitation" descr="0%" />
      <Button>
        <template #icon>
          <IconLocation />
        </template>
      </Button>
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
