import { reactive } from 'vue'
import axios from 'axios'
import { useStore } from 'pinia'

const state = reactive({
  loading: false,
  error: null
})

const login = async (email, password) => {
  state.loading = true
  state.error = null
  const store = useStore()
  try {
    const response = await axios.post('/api/login', {
      email,
      password
    })
    const token = response.data.access_token
    store.commit('setToken', token)
  } catch (error) {
    state.error = error.response.data
  } finally {
    state.loading = false
  }
}

export { state, login }