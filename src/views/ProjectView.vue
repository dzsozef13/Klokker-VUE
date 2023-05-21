<script setup>
import { ref, onMounted } from 'vue';
import { storage } from '../storage/local.storage'
import TaskCard from '../components/cards/TaskCard.vue';
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
const tasks = ref(null);

const newProject = () => {
  router.push('/new-task/'+projectId);
};

onMounted(async () => {
  const projectResponse = await get(projectId);
  console.log(projectResponse);
  project.value = projectResponse;

  const taskResponse = await getForProject(projectId);
  console.log(taskResponse);
  tasks.value = taskResponse;
});

// const tasks = ref([
//   {
//     title: "Test task 1",
//     description: 'Test task description, lorem ipsum, this is a nice paragraph.',
//     assignedUser: "John Doe",
//     startDate: "05/22",
//     dueDate: "05/27",
//     state: "todo",
//     billable: true
//   },
//   {
//     title: "Test task 2",
//     description: 'Test task description, lorem ipsum, this is a nice paragraph.',
//     assignedUser: "John Doe",
//     startDate: "05/22",
//     dueDate: "05/27",
//     state: "todo",
//     billable: true
//   },
//   {
//     title: "Test task 3",
//     description: 'Test task description, lorem ipsum, this is a nice paragraph.',
//     assignedUser: "John Doe",
//     startDate: "05/22",
//     dueDate: "05/27",
//     state: "doing",
//     billable: true
//   },
//   {
//     title: "Test task 4",
//     description: 'Test task description, lorem ipsum, this is a nice paragraph.',
//     assignedUser: "John Doe",
//     startDate: "05/22",
//     dueDate: "05/27",
//     state: "done",
//     billable: true
//   },
// ])
</script>

<template>
  <div class="row header">
    <h1>{{ project?.name ?? '...' }}</h1>
    <button @click="newProject" id="login-button" class="rounded-m">New Task</button>
  </div>
  <div class="space-h"></div>
  <div class="row fullpage">
    <div class="col-3 center-v">
      <h3>Todo</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'todo' || task?.state == undefined">
          <TaskCard :title="task.title" :description="task.description" :assignedUser="task.assignedUser"
            :startDate="task.startDate" :dueDate="task.dueDate" :state="task.state" :billable="task.billable" />
          <div class="space-h"></div>
        </div>
      </div>
    </div>
    <div class="space-v"></div>
    <div class="col-3 center-v">
      <h3>Doing</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'doing'">
          <TaskCard :title="task.title" :description="task.description" :assignedUser="task.assignedUser"
            :startDate="task.startDate" :dueDate="task.dueDate" :state="task.state" :billable="task.billable" />
          <div class="space-h"></div>
        </div>
      </div>
    </div>
    <div class="space-v"></div>
    <div class="col-3 center-v">
      <h3>Done</h3>
      <div v-for="task in tasks">
        <div v-if="task?.state === 'done'">
          <TaskCard :title="task.title" :description="task.description" :assignedUser="task.assignedUser"
            :startDate="task.startDate" :dueDate="task.dueDate" :state="task.state" :billable="task.billable" />
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