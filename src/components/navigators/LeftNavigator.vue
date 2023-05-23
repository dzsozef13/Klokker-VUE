<script setup>
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { storage } from '../../storage/local.storage'
import teamManager from '../../managers/team.manager'
import projectManager from '../../managers/project.manager'
import userManager from '../../managers/user.manager'
import authManager from '../../managers/auth.manager'

const { getForLoggedInUser, getForLoggedInUserInvite } = teamManager();
const { getForTeam } = projectManager();
const { refreshLoggedInUser, assignTeamToLoggedInUser, updateLoggedInUser } = userManager();
const { logoutCurrentUser } = authManager();
const user = ref(storage.get('user'));
const team = ref(null);
const projects = ref(null);
const inviteFromTeam = ref(null);

const acceptInvite = () => {
  assignTeamToLoggedInUser(inviteFromTeam?.value._id);
  inviteFromTeam.value = null;
};

const declineInvite = () => {
  let updateBody = {
    invite: null
  }
  updateLoggedInUser(updateBody);
  inviteFromTeam.value = null;
};

const logout = () => {
  logoutCurrentUser()
  user.value = null;
}

onBeforeMount(async () => {
  const userResponse = await refreshLoggedInUser();
  user.value = userResponse;

  const teamResponse = await getForLoggedInUser();
  team.value = teamResponse.name;

  const projectResponse = await getForTeam();
  projects.value = projectResponse;

  const inviteResponse = await getForLoggedInUserInvite();
  inviteFromTeam.value = inviteResponse;
});

const visitorMenuItems = ref([
  {
    title: "Login",
    path: "/login"
  },
  {
    title: "Register",
    path: "/regist"
  },
])

const userMenuItems = ref([
  {
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    title: "My Team",
    path: "/myteam"
  },
])

const adminMenuItems = ref([
  {
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    title: "My Team",
    path: "/myteam"
  },
  {
    title: "➕ Invite Members",
    path: "/invite"
  },
])
</script>

<template>
  <div id="container">

    <div class="menu rounded-m shadow">
      <div>
        <h1>Klokker</h1>
        <h5>👋 {{ user?.name ?? 'Welcome'  }} </h5>
        <!-- <h5>Team: {{ team ?? '...' }} </h5> -->
        <div class="space-h"></div>
        <div v-if="user">
          <button id="logout-button" @click="logout">🚪</button>
        </div>
      </div>
      <div class="space-h"></div>
      <ul>
        <ul v-if="user?.role === 'user'">
          <li v-for="(item, index) in userMenuItems" :key="index">
            <a :href="item.path">{{ item.title }}</a>
          </li>
        </ul>
        <ul v-else-if="user?.role === 'admin'">
          <li v-for="(item, index) in adminMenuItems" :key="index">
            <a :href="item.path">{{ item.title }}</a>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item, index) in visitorMenuItems" :key="index">
            <a :href="item.path">{{ item.title }}</a>
          </li>
        </ul>
      </ul>
    </div>

    <div v-if="user">
      <div class="menu rounded-m shadow">
        <h3>Projects</h3>
        <div class="space-h"></div>
        <ul>
          <li v-for="(project, index) in projects" :key="index">
            <a :href="'/project/'+project._id">📁 {{ project.name }}</a>
          </li>
        </ul>
        
        <div v-if="user?.role == 'admin'">
          <a href="/new-project">➕ New Project</a>
        </div>
      </div>

      <div v-if="inviteFromTeam != null">
        <div class="menu rounded-m shadow">
          <h2>💌</h2>
          <h5> You've received an invitation to join: </h5>
          <h4> {{ inviteFromTeam?.name }} </h4>
          <div class="space-h"></div>
          <button @click="acceptInvite" class="rounded-s">Join</button>
          <div class="space-h"></div>
          <button @click="declineInvite" id="decline-inv-button" class="rounded-s">Nope</button>
          <div class="space-h"></div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<style scoped>
#container {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 200px;
  margin: 20px;
}

.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px 10px 20px;
  background-color: var(--kl-dark-2);
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
  cursor: pointer;
}

a {
  margin-bottom: 10px;
}

#decline-inv-button {
  background-color: var(--kl-red);
}
#decline-inv-button:hover {
  background-color: var(--kl-light-1);
}

#logout-button {
  padding: 0;
  height: 20px;
  background-color: var(--kl-dark-2);
}
</style>
  