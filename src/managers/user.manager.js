import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { storage } from '../storage/local.storage'

const userManager = () => {
  const router = useRouter();
  const apiUrl = import.meta.env.VITE_API_URL;

  const token = storage.get('token');
  const user = storage.get('user');

  const userService = axios.create({
    baseURL: apiUrl + '/user'
  });

  userService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const state = reactive({
    loading: false,
    success: false,
    error: null
  })

  const createUser = async (email, name, password) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.post('/', {
        email: email,
        password: password,
        name: name,
        role: 'user'
      });
      router.push('/login');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed sign up'
    } finally {
      state.loading = false
    }
  }

  const getUserById = async (userId) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.get('/' + userId);
      storage.set('user', user);
      router.push('/');
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find user'
    } finally {
      state.loading = false
    }
  }

  const getUsers = async (userQuery) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.get('/', {
        params: userQuery,
      });
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not find user'
    } finally {
      state.loading = false
    }
  }

  const refreshLoggedInUser = async () => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.get('/' + user._id);
      storage.set('user', response.data);
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed refresh'
    } finally {
      state.loading = false
    }
  }

  const updateLoggedInUser = async (updateBody) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.patch('/' + user._id, updateBody);
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not update user'
      state.loading = false
      throw error
    }
  }

  const inviteUserToTeam = async (email) => {
    state.loading = true
    state.error = null
    try {
      const userByEmail = await userService.get('/email/' + email);
      console.log(userByEmail);
      const response = await userService.patch('/' + userByEmail.data._id, {invite: user._teamId});
      router.push('/myteam');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not update user'
      state.loading = false
      throw error
    }
  }

  const updateUserById = async (userId, updateBody) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.patch('/' + userId, {updateBody});
      return response.data
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not update user'
      state.loading = false
      throw error
    }
  }

  const assignTeamToLoggedInUser = async (teamId) => {
    state.loading = true
    state.error = null
    try {
      const response = await userService.post('/team', {
        teamId: teamId,
        userId: user._id,
      });
      const removeInvite = await userService.patch('/' + user._id, {invite: null});
      console.log(removeInvite);
      router.push('/myteam');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Could not assign user to team'
    } finally {
      state.loading = false
    }
  }

  return { state, createUser, getUserById, getUsers, refreshLoggedInUser, inviteUserToTeam, updateLoggedInUser, updateUserById, assignTeamToLoggedInUser }
}

export default userManager