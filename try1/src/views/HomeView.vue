<script setup lang="ts">
import { onMounted, ref } from "vue";
// services
import { getAccountsService } from "@/services/getAccounts";
// types
import type { IAccountGroup } from "@/types/typings.d.ts";

// state //
const accounts = ref<IAccountGroup[]>();

// methods //
onMounted(async () => {
  const fetchedData = await getAccounts();
  accounts.value = fetchedData.accountGroups;
  console.log(accounts.value);
});

const getAccounts = async () => {
  const fetchedAccounts = await getAccountsService();
  return fetchedAccounts;
};
</script>

<template>
  <main>
    <h1>home</h1>
  </main>
</template>
