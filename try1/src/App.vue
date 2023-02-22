<script setup lang="ts">
import { RouterView } from "vue-router";
// components
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <main class="container">
    <AppHeader />
    <RouterView />
  </main>
</template>

<style lang="scss">
.container {
  max-width: 100rem;
  min-width: 30rem;
  margin: 10rem auto;
  padding: 1rem;
  min-height: 100vh;
}
</style>
