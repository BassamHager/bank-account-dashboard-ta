<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { onMounted } from "vue";
// components
import AppHeader from "@/components/AppHeader.vue";
// router
const router = useRouter();
// methods
onMounted(() => router.push("/accounts"));
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
  margin: auto;
  padding: 10rem 1rem;
  min-height: 100vh;
}
</style>
