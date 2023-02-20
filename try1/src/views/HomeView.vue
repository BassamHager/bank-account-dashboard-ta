<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
// components
import AccountList from "@/components/AccountList.vue";
import AccountDetails from "@/components/AccountDetails.vue";
// services
import { getAccountsService } from "@/services/getAccounts";
// types
import type { IAccountGroup } from "@/types/typings";
import type { IAccountStatement } from "@/types/transaction";
// data
const accounts = ref<IAccountGroup[]>();
const accountStatement = ref<IAccountStatement>();
const showAccountStatement = computed<boolean>(
  () => !!accountStatement.value?.account.accountNumber
);
// methods
onMounted(async () => {
  // update accounts
  accounts.value = await getAccountsService();
});
const getStatement = (val: IAccountStatement) => {
  accountStatement.value = val;
};
const clearAccountStatement = () => {
  accountStatement.value = undefined;
};
</script>

<template>
  <main>
    <AccountList
      v-if="!showAccountStatement"
      :accounts="accounts as IAccountGroup[]"
      @selectAccount="(val) => getStatement(val)"
    />

    <AccountDetails
      v-else
      :accountStatement="accountStatement"
      :showStatement="showAccountStatement"
      @backToList="clearAccountStatement"
    />
  </main>
</template>
