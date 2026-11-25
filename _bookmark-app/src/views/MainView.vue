<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store.ts';

import BaseButton from '@/components/BaseButton.vue';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import CategoriesList from '@/components/CategoriesList.vue';

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.clearToken();
  router.push({ name: 'auth' });
}
</script>

<template>
  <div class="app">
    <aside class="app__aside">
      <div>
        <ProfileAvatar />
        <BaseButton label="Logout" @click="logout" />
      </div>
      <CategoriesList />
    </aside>
    <main class="app__main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 2.5rem;
  width: 100%;
  max-width: 1450px;
  height: 100%;
  margin: 0 auto;
  padding: 2rem;
  overflow: hidden;
}

.app__aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 4rem;
}

.profile-avatar {
  margin-bottom: 1.5rem;
}

.app__main {
  padding-block: 4rem;
}
</style>
