<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from '../stores/profile.store.ts';

const store = useProfileStore();

onMounted(() => {
  store.fetchProfile();
});
</script>

<template>
  <div v-if="store.profile" class="profile-avatar">
    <img
      src="../assets/images/avatar.jpeg"
      alt="User avatar"
      width="80"
      height="80"
      class="profile-avatar__image"
    />
    <p class="profile-avatar__name">
      Hello, <strong>{{ store.profile.name }}</strong>
    </p>
  </div>
</template>

<style lang="css" scoped>
.profile-avatar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-avatar__image {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 100%;
}

.profile-avatar__name {
  font-size: 1.125rem;
}
</style>
