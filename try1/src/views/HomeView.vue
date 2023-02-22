<script setup lang="ts">
import { onMounted, ref } from "vue";
// components
import AccountList from "@/components/AccountList.vue";
// services
import { getAccountsService } from "@/services/getAccounts";
// types
import type { IAccountGroup } from "@/types/typings";
// data
const accountGroups = ref<IAccountGroup[]>();
// methods
onMounted(async () => {
  // update accounts
  accountGroups.value = await getAccountsService();
});
</script>

<template>
  <main>
    <AccountList :accountGroups="accountGroups" />
  </main>
</template>
