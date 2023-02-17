<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="container">
    <header>
      <h1>Bank Account Overview</h1>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
header {
  border-bottom: 1px solid #aaa;
  text-align: center;
  height: 10rem;
  display: grid;
  place-items: center;
}

.container {
  max-width: 100rem;
  min-width: 30rem;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}
</style>
