import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { storage } from '../storage/local.storage'

const authManager = () => {
  const router = useRouter();
  
  const authService = axios.create({
    baseURL: 'http://localhost:4000/auth'
  });
  
  const state = reactive({
    loading: false,
    success: false,
    error: null
  })
  
  const login = async (email, password) => {
    state.loading = true
    state.error = null
    try {
      const response = await authService.post('/login', {
        email,
        password
      })
      const token = response.data.token
      const user = response.data.user
      storage.set('token', token);
      storage.set('user', user);
      router.push('/');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed login'
    } finally {
      state.loading = false
    }
  }

  const logout = () => {
    storage.set(null, token)
  }

  return { state, login, logout }
}

export default authManager