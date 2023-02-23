<script setup lang="ts">
import { useRoute } from "vue-router";
// components
import AccountDetails from "@/components/accounts/AccountDetails.vue";
// router & routes
const route = useRoute();
const { accountId } = route.params;
</script>

<template>
  <AccountDetails :accountId="accountId" />
</template>
