<template>
  <div v-if="visible" class="message">
    <p>{{ message }}</p>
    <button @click="hideMessage">Hide</button>
  </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'MessagePopup',
  props: {
    initialMessage: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const visible = ref(true);
    const message = ref(props.initialMessage);

    const hideMessage = () => {
      visible.value = false;
    };

    return {
      visible,
      message,
      hideMessage,
    };
  },
};
</script>
  
<style scoped>
.message {
  background-color: #f7f7f7;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
  