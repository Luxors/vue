<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Profile } from './types';

import { API_ROUTES } from './api';

import ProfileAvatar from './components/ProfileAvatar.vue';

const profile = ref<Profile | null>(null);

async function fetchProfile() {
  const data = await fetch(API_ROUTES.profile);
  const res = (await data.json()) as Profile;
  profile.value = res;
}

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div class="app">
    <nav>
      <ProfileAvatar v-if="profile" :name="profile.name" />
    </nav>
    <main>Content</main>
  </div>
</template>
