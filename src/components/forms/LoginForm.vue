<template>
  <div>
    <input type="email" v-model="email">
    <input type="password" v-model="password">
    <button @click="submitLogin">Login</button>
    <div v-if="authState.loading">Loading...</div>
    <div v-if="authState.error">Error: {{ authState.error }}</div>
  </div>
</template>
  
<script>
import { login, state as authState } from '../../managers/auth.manager'
import { ref } from 'vue'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const submitLogin = () => {
      login(email.value, password.value)
    }

    return {
      email,
      password,
      submitLogin,
      authState
    }
  }
}
</script>
  
<style lang="scss" scoped></style>