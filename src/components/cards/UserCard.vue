<script setup>
import { ref, defineProps } from 'vue';
import { storage } from '../../storage/local.storage'
import userManager from '../../managers/user.manager'

const loggedInUser = ref(storage.get('user'));

const { updateUserById } = userManager();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
})

const kickUser = () => {
  console.log('Bye Bye');
  // let updateBody = { 
  //   _teamId: null,
  // }
  // updateUserById(id, updateBody);
}
</script>

<template>
  <div class="user-card row shadow rounded-m">
    <h3>{{ props.name }}</h3>
    <div v-if="props.role == 'admin'">
      <h3>👑</h3>
    </div>
    <div v-if="loggedInUser?.role == 'admin'">
      <button @click="kickUser" id="kick-button" class="rounded-s">Kick Out</button>
    </div>
  </div>
</template>
  
<style scoped>
h3 {
  font-weight: var(--font-weight-bold);
  -webkit-user-select: text;
  /* Safari */
  -moz-user-select: text;
  /* Firefox */
  -ms-user-select: text;
  /* Internet Explorer/Edge */
  user-select: text;
  /* Standard syntax */
}

h5 {
  -webkit-user-select: text;
  /* Safari */
  -moz-user-select: text;
  /* Firefox */
  -ms-user-select: text;
  /* Internet Explorer/Edge */
  user-select: text;
  /* Standard syntax */
}

.user-card {
  padding: 16px;
  background-color: var(--kl-dark-2);
  justify-content: space-between;
}

#kick-button {
  background-color: var(--kl-red);
}
#kick-button:hover {
  background-color: var(--kl-light-1);
}
</style>