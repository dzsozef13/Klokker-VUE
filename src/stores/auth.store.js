import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = '';

  function setToken(newToken) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = '';
  }

  return {
    token,
    setToken,
    clearToken,
  };
});