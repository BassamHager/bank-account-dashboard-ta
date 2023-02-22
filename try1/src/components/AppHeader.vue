<script setup lang="ts">
import { RouterLink } from "vue-router";
// context
import { accounts } from "@/context/constants";
</script>

<template>
  <header>
    <RouterLink :to="`${accounts}`">
      <h1>Bank Account Overview</h1>
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
header {
  text-align: center;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: 100;
  background: rgba($color: #000, $alpha: 0.8);

  a {
    text-decoration: none;
    color: rgba($color: #fff, $alpha: 0.5);

    &:hover {
      color: #fff;
    }
  }
}
</style>
