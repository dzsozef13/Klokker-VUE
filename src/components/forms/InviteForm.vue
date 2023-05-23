<script setup>
import teamManager from '../../managers/team.manager';
import { ref, watch, defineEmits } from 'vue';

const teamName = ref('');

const { create, state } = teamManager()

const submitTeam = () => {
  create(teamName.value);
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
    <h2 class="title">Create team</h2>
    <h5 class="input-title">Name</h5>
    <input type="text" placeholder="My Company Inc." v-model="teamName">
    <button @click="submitTeam" id="create-button" class="rounded-m" >Create Team</button>
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