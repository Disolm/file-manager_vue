<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
