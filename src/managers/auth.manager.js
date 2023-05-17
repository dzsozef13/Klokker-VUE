import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'

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
    const store = useAuthStore()
    try {
      const response = await authService.post('/login', {
        email,
        password
      })
      const token = response.data.token
      localStorage.setItem("auth-token", token)
      router.push('/');
    } catch (error) {
      state.error = error.response?.data.error.message ?? 'Failed login'
    } finally {
      state.loading = false
    }
  }

  return { state, login }
}

export default authManager