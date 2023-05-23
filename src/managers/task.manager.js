import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { storage } from '../storage/local.storage'

const taskManager = () => {
  const router = useRouter();
  const apiUrl = import.meta.env.VITE_API_URL;

  const token = storage.get('token');
  const loggedInUser = storage.get('user');

  const taskService = axios.create({
    baseURL: apiUrl + '/task'
  });

  taskService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const state = reactive({
    loading: false,
    success: false,
    error: null
  })

  const create = async (taskBody) => {
    state.loading = true
    state.error = null
    try {
      const response = await taskService.post('/', {
        title: taskBody.title,
        description: taskBody.description,
        allocMinutes: taskBody.allocMinutes + (taskBody.allocHours * 60),
        dueDate: taskBody.dueDate,
        _projectId: taskBody.projectId,
      })
      console.log(response);
      router.push('/project/' + taskBody.projectId);
    } catch (error) {
      console.log(error);
      state.error = error.response?.data.error.message ?? 'Failed task creation'
    } finally {
      state.loading = false
    }
  }

  const getForProject = async (projectId) => {
    state.loading = true
    state.error = null
    try {
      let taskQuery = {
        _projectId: projectId
      }
      const response = await taskService.get('/', {
        params: taskQuery,
      });
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find tasks'
      state.loading = false
      throw error
    }
  }

  const update = async (taskId, updateBody) => {
    state.loading = true
    state.error = null
    console.log(taskId);
    console.log(updateBody);
    try {
      const response = await taskService.patch('/' + taskId, updateBody);
      location.reload(true);
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not update task'
      state.loading = false
      throw error
    }
  }

  return { state, create, getForProject, update }
}

export default taskManager