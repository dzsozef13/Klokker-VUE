<script setup>
import { ref, onMounted } from 'vue';
import { storage } from '../storage/local.storage'
import TeamForm from '../components/forms/TeamForm.vue';
import LeftNavigator from '../components/navigators/LeftNavigator.vue'
import UserCard from '../components/cards/UserCard.vue';
import teamManager from '../managers/team.manager';
import userManager from '../managers/user.manager';

const { create, state, getForLoggedInUser } = teamManager();
const { getUsers } = userManager();

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));
const team = ref(null);
const members = ref([]);

const message = ref('');
const showMessage = ref(false);

const leaveTeam = () => {
  console.log('Bye Bye');
  team.value = null
}

onMounted(async () => {
  const teamResponse = await getForLoggedInUser();
  console.log(teamResponse);
  team.value = teamResponse;

  let userQuery = {
    _teamId: team.value._id
  }
  const membersResponse = await getUsers(userQuery);
  console.log(membersResponse);
  members.value = membersResponse;
});
</script>

<template>
  <LeftNavigator/>

  <div v-if="user?._teamId != null">
    <div class="row header">
      <h1>{{ team?.name ?? '...' }}</h1>
      <button @click="leaveTeam" id="leave-button" class="rounded-s">Leave Team</button>
    </div>
    <div class="col-2 center-h">
      <div class="space-h"></div>
      <div class="space-h"></div>
      <h2> {{ members?.length }} Members</h2>
      <div class="space-h"></div>
      <div v-for="user in members">
        <UserCard 
          :id="user._id"
          :name="user.name"
          :role="user.role"
        />
        <div class="space-h"></div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="row fullpage">
      <div class="col-2 center-h">
        <img id="art" class="background-image" src="../assets/images/clouds-1.png">
        <h2>Is it your next billion dollar business? 🚀</h2>
      </div>
      <div class="col-2 center-h">
        <TeamForm @responded="handleCreateResponse"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 40px;
}

#leave-button {
  background-color: var(--kl-red);
}
#leave-button:hover {
  background-color: var(--kl-light-1);
}
</style>
