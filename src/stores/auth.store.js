import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  var token = '';

  function reset() {
    token = '';
  }

  return { token, reset }
})
