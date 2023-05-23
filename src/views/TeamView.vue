<script setup>
import { ref } from 'vue';
import { storage } from '../storage/local.storage'
import TeamForm from '../components/forms/TeamForm.vue';
import LeftNavigator from '../components/navigators/LeftNavigator.vue'
import MessagePopup from '../components/popups/MessagePopup.vue';
import teamManager from '../managers/team.manager';

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));

const { create, state, getForLoggedInUser } = teamManager()

const message = ref('');
const showMessage = ref(false);
const team = ref(await getForLoggedInUser());

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
      <h2>Is it your next billion dollar business? 🚀</h2>
    </div>
    <div class="col-2 center-h">
      <TeamForm @responded="handleCreateResponse"/>
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
