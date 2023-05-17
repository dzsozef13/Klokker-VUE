<script setup>
import { useAuthStore } from '../stores/auth.store';
import { computed } from 'vue';

const token = localStorage.getItem("auth-token");

</script>

<template>
  <div class="row fullpage">
    <div class="col-1 center-v center-h stack-items">
      <img id="art" class="background-image" src="../assets/images/clouds-1.png">
      <h2>Welcome.</h2>
      <p>{{ token }}</p>
    </div>
  </div>
</template>

