<template>
  <div id="container" class="rounded-m">
    <div id="logo">
      <h1>Klokker</h1>
    </div>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <a :href="item.path">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>
  
<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      menuItems: [
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
      ]
    });

    return {
      menuItems: state.menuItems,
    };
  },
};
</script>
  
<style scoped>
#logo, h1 {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
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
  