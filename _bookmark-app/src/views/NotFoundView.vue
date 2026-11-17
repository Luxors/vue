<script setup lang="ts">
import { useRouter } from 'vue-router';

import BaseButton from '@/components/BaseButton.vue';

const router = useRouter();

function goToMain() {
  router.push({
    name: 'main',
  });
}
</script>

<template>
  <main class="not-found">
    <div class="not-found__caption">
      <h1 class="not-found__title">404</h1>
      <BaseButton label="Back to Home" @click="goToMain" />
    </div>
  </main>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.not-found__caption {
  text-align: center;
}

.not-found__title {
  margin-bottom: 3.25rem;
  font-size: 8rem;
}
</style>
