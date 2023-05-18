<script setup>
import { ref } from 'vue';
import { storage } from '../storage/local.storage'

const token = ref(storage.get('token'));
const user = ref(storage.get('user'));
</script>

<template>
  <div class="row fullpage">
    <div class="col-1 center-v center-h">
      <h2>Welcome {{ user.name }} to this beautiful website that does nothing just yet</h2>
      <h5>{{ token }}</h5>
    </div>
  </div>
</template>
