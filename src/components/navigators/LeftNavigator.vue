<script setup>
import { ref } from 'vue';
import { storage } from '../../storage/local.storage'

const user = ref(storage.get('user'));

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
    title: "New Task",
    path: "/new-task"
  },
])

const adminMenuItems = ref([
  {
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    title: "New Task",
    path: "/new-task"
  },
  {
    title: "Invite Members",
    path: "/invite"
  },
])
</script>

<template>
  <div id="container" class="rounded-m shadow">
    <div id="logo">
      <h1>Klokker</h1>
    </div>
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
</template>
  
<style scoped>
#logo h1 {
  margin-bottom: 32px;
}

#container {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 200px;
  background-color: var(--kl-dark-2);
  padding: 20px;
  margin: 20px;
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
</style>
  