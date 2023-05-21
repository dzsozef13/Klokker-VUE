<script setup>
import { RouterView } from 'vue-router'
import LeftNavigator from './components/navigators/LeftNavigator.vue'
</script>

<template>
  <Suspense> 
    <RouterView/>
  </Suspense>
  <LeftNavigator/>
</template>

<style scoped>
</style>
