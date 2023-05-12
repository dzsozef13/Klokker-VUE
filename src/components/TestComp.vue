<template>
  <div>
    <p v-for="item in state.data" :key="item.id">
      {{ item.email }}
    </p>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  async setup() {
    const state = reactive({
      error: null,
      data: null
    })

    try {
      const userResponse = await fetch('https://reqres.in/api/users?delay=2')

      userResponse.json().then(response => {
        state.data = response.data
      })
    }
    catch (error) {
      state.error = error.message
      console.log(state.error)
    }
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped></style>