<script setup>
import { ref, onMounted } from 'vue';
import { storage } from '../../storage/local.storage'
import teamManager from '../../managers/team.manager'
import projectManager from '../../managers/project.manager'

const { getForLoggedInUser } = teamManager();
const { getForTeam } = projectManager();
const user = ref(storage.get('user'));
const team = ref(null);
const projects = ref(null);

onMounted(async () => {
  const teamResponse = await getForLoggedInUser();
  console.log(teamResponse.name);
  team.value = teamResponse.name;

  const projectResponse = await getForTeam();
  console.log(projectResponse);
  projects.value = projectResponse;
});

const visitorMenuItems = ref([
  {
    title: "Home",
    path: "/"
  },
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
  {
    title: "New Project",
    path: "/create-project"
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
        <h5>👋 {{ user.name ?? '...'  }} </h5>
        <!-- <h5>Team: {{ team ?? '...' }} </h5> -->
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

    <div class="menu rounded-m shadow">
      <h3>Projects</h3>
      <div class="space-h"></div>
      <ul>
        <li v-for="(project, index) in projects" :key="index">
          <a :href="'/project/'+project._id">📁 {{ project.name }}</a>
        </li>
      </ul>
    
      <a href="/new-project">➕ New Project</a>
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
</style>
  