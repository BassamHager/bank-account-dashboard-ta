<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// components
import AccountDetails from "@/components/accounts/AccountDetails.vue";
// types
import type { IAccountStatement } from "@/types/transaction";
// services
import { getTransactionsByAccountNumber } from "@/services/getTransactions";
import { getAccountBalance, getAccountsService } from "@/services/getAccounts";
// data
const accountStatement = ref<IAccountStatement>();
const accountBalance = ref<number>();
// router & routes
const route = useRoute();
const { accountId } = route.params;
// methods
onMounted(async () => {
  accountStatement.value = await getTransactionsByAccountNumber({
    accountNumber: accountId as string,
  });
  accountBalance.value = await getAccountBalance({
    accountNumber: accountId as string,
  });
});
</script>

<template>
  <AccountDetails
    v-if="accountStatement"
    :accountStatement="accountStatement"
    :balance="accountBalance"
  />
</template>
