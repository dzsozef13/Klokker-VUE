<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import TestComp from '../components/TestComp.vue'
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <TestComp/>
      </template>
      <template #fallback>
        Nono
      </template>
    </Suspense>
  </main>
</template>
