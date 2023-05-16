<template>
  <div id="form">
    <h2 class="title" >Login</h2>
    <h5 class="input-title">Email</h5>
    <input class="input" type="email" placeholder="myfunkyemail@klokker.com" v-model="email">
    <h5 class="input-title">Password</h5>
    <input type="password" placeholder="iloveCats123" v-model="password">
    <button @click="submitLogin" id="login-button" class="rounded-m" >Login</button>
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
  
<style scoped>
#form {
  display: flex;
  flex-direction: column;
}
.input {
  margin-bottom: 16px;
}

.title {
  margin-bottom: 16px;
}

#login-button {
  margin-top: 32px;
}
</style>