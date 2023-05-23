<script setup>
import { ref } from 'vue';
import { storage } from '../storage/local.storage'
import LeftNavigator from '../components/navigators/LeftNavigator.vue'
import TaskCard from '../components/cards/TaskCard.vue';

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));

const tasks = ref([
  {
    title: "Test task 1",
    description: 'Test task description, lorem ipsum, this is a nice paragraph.',
    assignedUser: "John Doe",
    startDate: "05/22",
    dueDate: "05/27",
    state: "todo",
    billable: true
  },
  {
    title: "Test task 2",
    description: 'Test task description, lorem ipsum, this is a nice paragraph.',
    assignedUser: "John Doe",
    startDate: "05/22",
    dueDate: "05/27",
    state: "todo",
    billable: true
  },
  {
    title: "Test task 3",
    description: 'Test task description, lorem ipsum, this is a nice paragraph.',
    assignedUser: "John Doe",
    startDate: "05/22",
    dueDate: "05/27",
    state: "doing",
    billable: true
  },
  {
    title: "Test task 4",
    description: 'Test task description, lorem ipsum, this is a nice paragraph.',
    assignedUser: "John Doe",
    startDate: "05/22",
    dueDate: "05/27",
    state: "done",
    billable: true
  },
])
</script>

<template>
  <LeftNavigator/>
  <div class="row header">
    <h1>Dashboard</h1>
  </div>
</template>

<style scoped>
#grid {
  margin: 0 20px;
}
</style>