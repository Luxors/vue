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
  <main class="app-auth">
    <div class="app-auth__caption">
      <h1 class="app-auth__title">Bookmarkly</h1>
      <BaseButton label="Enter" @click="goToMain" />
    </div>
  </main>
</template>

<style scoped>
.app-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.app-auth__caption {
  text-align: center;
}

.app-auth__title {
  margin-bottom: 3.25rem;
  font-size: 3.25rem;
}
</style>
