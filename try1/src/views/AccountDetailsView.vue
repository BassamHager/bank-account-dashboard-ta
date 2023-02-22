<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// components
import AccountDetails from "@/components/AccountDetails.vue";
// types
import type { IAccountStatement } from "@/types/transaction";
// services
import { getTransactionsByAccountNumber } from "@/services/getTransactions";
import { getAccountsService } from "@/services/getAccounts";
// data
const accountStatement = ref<IAccountStatement>();
const route = useRoute();
const { accountId } = route.params;
const accountBalance = ref<number>();

// methods
onMounted(async () => {
  accountStatement.value = await getTransactionsByAccountNumber({
    accountNumber: accountId as string,
  });
  getAccountBalance({ accountNumber: accountId as string });
  // console.log(accountStatement.value);
});
const getAccountBalance = async ({
  accountNumber,
}: {
  accountNumber: string;
}) => {
  const groups = await getAccountsService();
  groups.forEach((group) =>
    group.accounts.forEach((account) => {
      if (account.accountNumber === accountNumber)
        accountBalance.value = account.balance
          ? account.balance
          : account.bookBalance;
    })
  );
};
// const getAccountTransactions = async ({ account }: { account: string }) => {
//   accountStatement.value = await getTransactionsByAccountNumber({
//     accountNumber: account,
//   });
// };
</script>
<template>
  <AccountDetails
    v-if="accountStatement"
    :accountStatement="accountStatement"
    :balance="accountBalance"
  />
</template>

<style lang="scss"></style>
