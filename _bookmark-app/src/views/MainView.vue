<script setup lang="ts">
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import CategoriesList from '@/components/CategoriesList.vue';
</script>

<template>
  <div class="app">
    <aside class="app__aside">
      <ProfileAvatar />
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
  justify-content: center;
}

.profile-avatar {
  margin-bottom: 2.5rem;
}
</style>
