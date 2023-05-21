import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { storage } from '../storage/local.storage'

const teamManager = () => {
  const router = useRouter();

  const token = storage.get('token');
  const loggedInUser = storage.get('user');
  
  const teamService = axios.create({
    baseURL: 'http://localhost:4000/team'
  });

  teamService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  
  const state = reactive({
    loading: false,
    success: false,
    error: null
  })
  
  const create = async (name) => {
    state.loading = true
    state.error = null
    try {
      const response = await teamService.post('/', {
        name: name,
        _ownerId: loggedInUser._id
      })
      router.push('/dashboard');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed login'
    } finally {
      state.loading = false
    }
  }

  const getForLoggedInUser = async () => {
    state.loading = true
    state.error = null
    try {
      console.log(storage.get('user'));
      const response = await teamService.get('/' + storage.get('user')._teamId);
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find team'
      state.loading = false
      throw error
    }
  }

  return { state, create, getForLoggedInUser }
}

export default teamManager