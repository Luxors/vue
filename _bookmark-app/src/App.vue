<script setup lang="ts">
import ProfileAvatar from './components/ProfileAvatar.vue';
import CategoriesList from './components/CategoriesList.vue';
</script>

<template>
  <div class="app">
    <nav>
      <ProfileAvatar />
      <CategoriesList />
    </nav>
    <main>Content</main>
  </div>
</template>

<style scoped>
.profile-avatar {
  margin-bottom: 2.5rem;
}
</style>
