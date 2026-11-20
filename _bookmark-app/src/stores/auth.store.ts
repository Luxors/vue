import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { LoginResponse } from '@/types';

import { API_ROUTES, http } from '@/api';

const AUTH_TOKEN_KEY = 'auth-token';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  const getToken = computed(() => token.value);

  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

  if (storedToken) {
    token.value = storedToken;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
  }

  function clearToken() {
    token.value = undefined;
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  async function login(email: string, password: string) {
    const { data } = await http.post<LoginResponse>(API_ROUTES.auth.login, {
      email,
      password,
    });
    token.value = data.token;
    setToken(data.token);
  }

  return {
    getToken,
    login,
    setToken,
    clearToken,
  };
});
