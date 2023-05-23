<script setup>
import userManager from '../../managers/user.manager';
import { ref, watch, defineEmits } from 'vue';

const email = ref('');
const password = ref('');
const name = ref('');

const { state, createUser } = userManager();

const submitRegist = () => {
    createUser(email.value, name.value, password.value);
};

const emit = defineEmits(['responded', 'unClose'])
const action = (message) => emit('responded', message);

watch(state, () => {
  if (state.error) {
    const message = state.error;
    action(message);
  }
});
</script>

<template>
  <div class="form">
    <h2 class="title" >Sign Up</h2>
    <h5 class="input-title">Full Name</h5>
    <input type="text" placeholder="Mr. Slacker" v-model="name">
    <h5 class="input-title">Email</h5>
    <input type="email" placeholder="myfunkyemail@klokker.com" v-model="email">
    <h5 class="input-title">Password</h5>
    <input type="password" placeholder="iloveCats123" v-model="password">
    <button @click="submitRegist" id="login-button" class="rounded-m" >Sign Up</button>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 16px;
}

.title {
  margin-bottom: 16px;
}

#login-button {
  margin-top: 32px;
}
</style>