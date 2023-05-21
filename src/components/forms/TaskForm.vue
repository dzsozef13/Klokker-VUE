<script setup>
import taskManager from '../../managers/task.manager';
import { ref, watch, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.id;

const title = ref('');
const description = ref('');
const allocHours = ref('');
const allocMinutes = ref('');
const dueDate = ref('');

const { create, state } = taskManager()

const submitCreate = () => {
  let taskBody = {
    title: title.value, 
    description: description.value,
    allocMinutes: allocMinutes.value,
    allocHours: allocHours.value,
    dueDate: dueDate.value,
    projectId: projectId
  }
  create(taskBody);
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
    <h2 class="title">New Task</h2>
    <h5 class="input-title">Title</h5>
    <input type="email" placeholder="An easy task" v-model="title">
    <h5 class="input-title">Description</h5>
    <textarea placeholder="It's not really easy, but you don't want to hear it's hard, do you?" v-model="description">
    </textarea>

    <h5 class="input-title">Allocated time</h5>
    <div class="form-row">
      <input type="number" placeholder="hours" v-model="allocHours">
      <div class="space-v"></div>
      <h3>:</h3>
      <div class="space-v"></div>
      <input type="number" placeholder="minutes" v-model="allocMinutes">
    </div>

    <h5 class="input-title">Due date</h5>
    <input type="date" v-model="dueDate">
    <button @click="submitCreate" id="login-button" class="rounded-m">Add Task</button>
  </div>
</template>

<style scoped>

.title {
  margin-bottom: 16px;
}

#login-button {
  margin-top: 32px;
}
</style>