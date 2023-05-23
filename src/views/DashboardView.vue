<script setup>
import { ref } from 'vue';
import { storage } from '../storage/local.storage'
import LeftNavigator from '../components/navigators/LeftNavigator.vue'
import TaskCard from '../components/cards/TaskCard.vue';

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));
</script>

<template>
  <LeftNavigator/>
  <div class="row header">
    <h1>Dashboard</h1>
  </div>
  <div class="row">
    <div class="col-1 center-v center-h">
      <div v-if="user">
        <div class="space-h"></div>
        <div class="space-h"></div>
        <div class="space-h"></div>
        <h3>Hello, {{ user?.name }}!</h3>
        <h4>What are we working on today? </h4>
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
h3 {
  font-size: 32px;
}
</style>