<script setup>
import { ref, onMounted } from 'vue';
import { storage } from '../storage/local.storage'
import TaskCard from '../components/cards/TaskCard.vue';
import LeftNavigator from '../components/navigators/LeftNavigator.vue'
import { useRoute, useRouter } from 'vue-router';
import projectManager from '../managers/project.manager'
import taskManager from '../managers/task.manager'

const route = useRoute();
const router = useRouter();
const projectId = route.params.id;

const { get } = projectManager();
const { getForProject } = taskManager();

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));
const project = ref(null);
const tasks = ref([]);
const doneCount = ref(0);

const newProject = () => {
  router.push('/new-task/'+projectId);
};

onMounted(async () => {
  const projectResponse = await get(projectId);
  project.value = projectResponse;

  const taskResponse = await getForProject(projectId);
  tasks.value = taskResponse;

  for (let i = 0; i < taskResponse.length; i++) {
  if (taskResponse[i].state == 'done') {
    doneCount.value++;
  }
}
});
</script>

<template>
  <LeftNavigator/>
  <div class="row header">
    <h1>{{ project?.name ?? '...' }}</h1>
    <!-- <h1> {{ doneCount }} / {{ tasks.value?.length ?? 0 }} </h1> -->
    <button @click="newProject" id="login-button" class="rounded-s">New Task</button>
  </div>
  <div class="space-h"></div>
  <div class="space-h"></div>
  <div class="row fullpage">
    <div class="col-3 center-v">
      <h3>Todo</h3>
      <div class="space-h"></div>
      <div v-for="task in tasks" style="width: 100%">
        <div v-if="task?.state === 'todo' || task?.state == undefined" style="width: 100%">
          <TaskCard 
            :id="task._id"
            :title="task.title" 
            :description="task.description" 
            :assignedUser="task.assignedUser"
            :allocMinutes="task.allocMinutes"
            :dueDate="new Date(task.dueDate).toLocaleDateString()"
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
      <div class="space-h"></div>
      <div v-for="task in tasks" style="width: 100%">
        <div v-if="task?.state === 'doing'" style="width: 100%">
          <TaskCard 
            :id="task._id"
            :title="task.title" 
            :description="task.description" 
            :assignedUser="task.assignedUser"
            :allocMinutes="task.allocMinutes"
            :dueDate="new Date(task.dueDate).toLocaleDateString()" 
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
      <div class="space-h"></div>
      <div v-for="task in tasks" style="width: 100%">
        <div v-if="task?.state === 'done'" style="width: 100%">
          <TaskCard 
            :id="task._id"
            :title="task.title" 
            :description="task.description" 
            :assignedUser="task.assignedUser"
            :allocMinutes="task.allocMinutes"
            :dueDate="new Date(task.dueDate).toLocaleDateString()" 
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

h3 {
  text-align: center;
  color: var(--kl-light-3);
}
</style>