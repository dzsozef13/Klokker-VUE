import { reactive } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'

const authService = axios.create({
  baseURL: 'http://localhost:4000/auth'
});

const state = reactive({
  loading: false,
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
    console.log(token);
    store.commit('setToken', token)
  } catch (error) {
    state.error = error.response.data
  } finally {
    state.loading = false
  }
}

export { state, login }