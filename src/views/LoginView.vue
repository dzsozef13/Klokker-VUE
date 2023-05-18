<script setup>
import { ref } from 'vue';
import LoginForm from '../components/forms/LoginForm.vue';
import MessagePopup from '../components/popups/MessagePopup.vue';

const message = ref('');
const showMessage = ref(false);

const handleLoginResponse = (msg) => {
  message.value = msg
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false;
  }, 10000);
};
</script>

<template>
  <div class="row fullpage">
    <div class="col-2 center-v center-h">
      <img id="art" class="background-image" src="../assets/images/clouds-1.png">
      <h2>Keep track of tasks, manage your teams.</h2>
    </div>
    <div class="col-2">
      <LoginForm @responded="handleLoginResponse"/>
    </div>
  </div>
  <div v-if="showMessage">
    <MessagePopup :message="message"/>
  </div>
</template>

<style scoped>
h2 {
  font-size: 40px;
}
</style>
