<script setup>
import { ref } from 'vue';
import { storage } from '../storage/local.storage'
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
  <div class="row header">
    <h1>Dashboard</h1>
  </div>
  <div class="space-h"></div>
  <div class="row fullpage">
    <div class="col-3 center-v">
      <h3>Todo</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'todo'">
          <TaskCard 
            :title="task.title" 
            :description="task.description"
            :assignedUser="task.assignedUser"
            :startDate="task.startDate"
            :dueDate="task.dueDate"
            :state="task.state"
            :billable="task.billable"
          />
          <div class="space-h"></div>
        </div>
      </div>
    </div>
    <div class="space-v"></div>
    <div class="col-3 center-v">
      <h3>Doing</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'doing'">
          <TaskCard 
            :title="task.title" 
            :description="task.description"
            :assignedUser="task.assignedUser"
            :startDate="task.startDate"
            :dueDate="task.dueDate"
            :state="task.state"
            :billable="task.billable"
          />
          <div class="space-h"></div>
        </div>
      </div>
    </div>
    <div class="space-v"></div>
    <div class="col-3 center-v">
      <h3>Done</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'done'">
          <TaskCard 
            :title="task.title" 
            :description="task.description"
            :assignedUser="task.assignedUser"
            :startDate="task.startDate"
            :dueDate="task.dueDate"
            :state="task.state"
            :billable="task.billable"
          />
          <div class="space-h"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#grid {
  margin: 0 20px;
}
</style>