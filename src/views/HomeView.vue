<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { storage } from '../storage/local.storage'
import LeftNavigator from '../components/navigators/LeftNavigator.vue'

const router = useRouter();

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));

const signMeUp = () => {
  router.push('/regist');
}

</script>

<template>
  <LeftNavigator/>
  <div class="row fullpage">
    <div class="col-1 center-v center-h">
      <div v-if="user">
        <h2>Welcome {{ user?.name }}!</h2>
        <h2>What are we working on today? </h2>
      </div>
      <div v-else>
        <h1>Welcome to Klokker.</h1>
        <h3>To start logging your tasks, please register a user first.</h3>
        <div class="space-h"></div>
        <button @click="signMeUp" class="rounded-s">Sign me up!</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 64px;
}
h3 {
  font-size: 32px;
}
</style>
