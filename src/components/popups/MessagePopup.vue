<script setup>
import { ref, defineProps } from 'vue';

const visible = ref(true);
const message = ref(props.message);

const props = defineProps({
  message: String
})

const hideMessage = () => {
  visible.value = false;
};
</script>

<template>
  <div v-if="visible" class="message rounded-m">
    <h5>{{ message }}</h5>
    <button class="rounded-s" @click="hideMessage">OK</button>
  </div>
</template>
  
<style scoped>
.message {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  bottom: 0;
  right: 0;
  width: max-content;
  background-color: var(--kl-dark-2);
  padding: 20px;
  margin: 20px;
  z-index: 999;
}

h5 {
  padding-right: 20px;
  color: var(--kl-light-1);
}

button {
  width: 40px;
  height: 40px;
}
</style>
  