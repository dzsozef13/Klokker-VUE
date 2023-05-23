<script setup>
import { ref } from 'vue';
import RegistForm from '../components/forms/RegistForm.vue';
import MessagePopup from '../components/popups/MessagePopup.vue';
import LeftNavigator from '../components/navigators/LeftNavigator.vue'

const message = ref('');
const showMessage = ref(false);

const handleRegistResponse = (msg) => {
  message.value = msg
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false;
  }, 10000);
};
</script>

<template>
  <LeftNavigator/>
  <div class="row fullpage">
    <div class="col-2 center-h">
      <img id="art" class="background-image" src="../assets/images/clouds-1.png">
      <h2>Keep track of tasks, manage your teams.</h2>
    </div>
    <div class="col-2 center-h">
      <RegistForm @responded="handleRegistResponse"/>
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
