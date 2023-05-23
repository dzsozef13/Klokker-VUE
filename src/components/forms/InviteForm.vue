<script setup>
import userManager from '../../managers/user.manager';
import { ref, watch, defineEmits } from 'vue';

const email = ref('');

const { state, inviteUserToTeam } = userManager()

const sendInvite = () => {
  inviteUserToTeam(email.value);
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
    <h2 class="title">Invite people</h2>
    <h5 class="input-title">Email</h5>
    <input type="text" placeholder="My Company Inc." v-model="email">
    <button @click="sendInvite" id="create-button" class="rounded-m" >Send</button>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 16px;
}

.title {
  margin-bottom: 16px;
}

#create-button {
  margin-top: 32px;
}
</style>