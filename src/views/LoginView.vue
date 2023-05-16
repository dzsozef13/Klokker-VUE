<script setup>
import LoginForm from '../components/forms/LoginForm.vue'
</script>

<template>
  <div class="row fullpage">
    <div class="col-2 center-v center-h stack-items">
      <img id="art" class="background-image" src="../assets/images/clouds-1.png">
      <h2>Keep track of tasks, manage your teams.</h2>
    </div>
    <div class="col-2">
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 40px;
}
</style>
