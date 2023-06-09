import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { storage } from '../storage/local.storage'

const projectManager = () => {
  const router = useRouter();
  const apiUrl = import.meta.env.VITE_API_URL;

  const token = storage.get('token');
  const loggedInUser = storage.get('user');

  const projectService = axios.create({
    baseURL: apiUrl + '/project'
  });

  projectService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const state = reactive({
    loading: false,
    success: false,
    error: null
  })

  const create = async (name, description) => {
    state.loading = true
    state.error = null
    try {
      const response = await projectService.post('/', {
        name: name,
        description: description,
        _teamId: loggedInUser._teamId
      })
      router.push('/dashboard');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed project creation'
    } finally {
      state.loading = false
    }
  }

  const get = async (projectId) => {
    state.loading = true
    state.error = null
    try {
      const response = await projectService.get('/'+projectId);
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find projects'
      state.loading = false
      throw error
    }
  }

  const getForTeam = async (teamId) => {
    state.loading = true
    state.error = null
    try {
      let projectQuery = {
        _teamId: teamId
      }
      const response = await projectService.get('/', {
        params: projectQuery,
      });
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find projects'
      state.loading = false
      throw error
    }
  }

  return { state, create, get, getForTeam }
}

export default projectManager