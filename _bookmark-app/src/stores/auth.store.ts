import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { LoginResponse } from '@/types';

import { API_ROUTES, http } from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  async function login(email: string, password: string) {
    const { data } = await http.post<LoginResponse>(API_ROUTES.auth.login, {
      email,
      password,
    });
    token.value = data.token;
  }

  return {
    token,
    login,
  };
});
