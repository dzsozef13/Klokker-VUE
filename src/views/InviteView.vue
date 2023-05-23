<script setup>
import { ref } from 'vue';
import InviteForm from '../components/forms/InviteForm.vue';
import LeftNavigator from '../components/navigators/LeftNavigator.vue'

const message = ref('');
const showMessage = ref(false);

const handleCreateResponse = (msg) => {
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
        <h2>Working in teams >>> Working alone </h2>
      </div>
      <div class="col-2 center-h">
        <InviteForm @responded="handleCreateResponse"/>
      </div>
    </div>
</template>

<style scoped>
h2 {
  font-size: 40px;
}
</style>
