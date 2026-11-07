import type { Profile } from '@/types';

import { API_ROUTES, http } from '@/api';

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null);

  async function fetchProfile() {
    const { data } = await http.get<Profile>(API_ROUTES.profile);
    profile.value = data;
  }

  return {
    profile,
    fetchProfile,
  };
});
