<script setup>
import projectManager from '../../managers/project.manager';
import { ref, watch, defineEmits } from 'vue';

const projectName = ref('');
const projectDescription = ref('');

const { create, state } = projectManager()

const submitProject = () => {
  create(projectName.value, projectDescription.value);
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
    <h2 class="title">Create project</h2>
    <h5 class="input-title">Name</h5>
    <input type="text" placeholder="Your 826th side-project" v-model="projectName">
    <h5 class="input-title">Short description</h5>
    <textarea placeholder="What is this about again?" v-model="projectDescription">
    </textarea>
    <button @click="submitProject" id="create-button" class="rounded-m">Create Project</button>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 16px;
}

.title {
  margin-bottom: 16px;
}

#create-button {
  margin-top: 32px;
}
</style>