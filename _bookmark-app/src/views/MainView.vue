<script setup lang="ts">
import ProfileAvatar from '../components/ProfileAvatar.vue';
import CategoriesList from '../components/CategoriesList.vue';
</script>

<template>
  <nav>
    <ProfileAvatar />
    <CategoriesList />
  </nav>
  <main><RouterView /></main>
</template>

<style scoped>
.profile-avatar {
  margin-bottom: 2.5rem;
}
</style>
