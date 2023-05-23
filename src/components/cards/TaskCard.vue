<script setup>
import { ref, defineProps } from 'vue';
import { storage } from '../../storage/local.storage'
import taskManager from '../../managers/task.manager'

const user = ref(storage.get('user'));

const { update } = taskManager();

const upState = () => {
  let updateBody = {
    state: props.state == "todo" ? "doing" : "done" 
  }
  update(props.id, updateBody);
}

const downState = () => {
  let updateBody = { 
    state: props.state == "done" ? "doing" : "todo" 
  }
  update(props.id, updateBody);
}

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedUser: {
    type: String,
    default: '',
  },
  allocMinutes: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  billable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="task-card shadow rounded-m">
    <h3>{{ title }}</h3>
    <div class="space-h"></div>
    <h5>{{ description }}</h5>
    <div class="space-h"></div>
    <div v-if="assignedUser">
      <h3>Assigned To: {{ assignedUser }}</h3>
    </div>
    <div class="row">
      <div>
        Est.:
        <h3> {{ Math.floor(allocMinutes / 60) }}h {{ allocMinutes % 60 }}m</h3>
      </div>
      <div class="space-v"></div>
      <div>
        Due:
        <h3> {{ dueDate }}</h3>
      </div>
    </div>

    <div class="space-h"></div>
    <div class="row controls">
      <div v-if="state != 'todo'">
        <button @click="downState" class="move-button rounded-s">
          <div v-if="state == 'doing'">◀️</div>
          <div v-if="state == 'done'">◀️</div>
        </button>
      </div>
      <div v-else>
        <div class="move-button-placeholder"></div>
      </div>

      <div v-if="user.length == 0">
        <button>Assign myself</button>
      </div>
      <div v-else-if="assignedUser == user._id">
        <button>X</button>
      </div>

      <div v-if="state != 'done'">
        <button @click="upState" class="move-button rounded-s">
          <div v-if="state == 'todo'">▶️</div>
          <div v-if="state == 'doing'">✅</div>
        </button>
      </div>
      <div v-else>
        <div class="move-button-placeholder"></div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
h3 {
  font-weight: var(--font-weight-bold);
  -webkit-user-select: text; /* Safari */
  -moz-user-select: text; /* Firefox */
  -ms-user-select: text; /* Internet Explorer/Edge */
  user-select: text; /* Standard syntax */
}

h5 {
  -webkit-user-select: text; /* Safari */
  -moz-user-select: text; /* Firefox */
  -ms-user-select: text; /* Internet Explorer/Edge */
  user-select: text; /* Standard syntax */
}

.task-card {
  padding: 16px;
  background-color: var(--kl-dark-2);
}

.controls {
  justify-content: space-between;
}

.move-button {
  padding: 0;
  width: 20px;
  height: 20px;
  background-color: var(--kl-dark-2);
  opacity: 0.2;
}

.move-button:hover {
  background-color: var(--kl-dark-2);
  opacity: 1;
}

.move-button-placeholder {
  width: 20px;
  height: 20px;
}


</style>