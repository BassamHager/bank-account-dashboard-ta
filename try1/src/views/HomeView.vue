<script setup lang="ts">
import { onMounted, ref } from "vue";
// services
import { getAccountsService } from "@/services/getAccounts";
import { getTransactionsByAccountNumber } from "@/services/getTransactions";
// types
import type { IAccountGroup } from "@/types/typings";
import type { IAccountStatement } from "@/types/transaction";
// composables
import { useResize } from "@/composable/useResize";
const resizingData = useResize({ doc: document.documentElement });

// state //
const accounts = ref<IAccountGroup[]>();
const accountStatement = ref<IAccountStatement>();

// methods //
onMounted(async () => {
  // update accounts
  accounts.value = await getAccountsService();
});

const getAccountTransactions = async ({ account }: { account: string }) => {
  const accountDetails = await getTransactionsByAccountNumber({
    accountNumber: account,
  });
  accountStatement.value = accountDetails;
  console.log(accountDetails);
};
</script>

<template>
  <main>
    <div
      v-for="(accountGroup, index) in accounts"
      :key="index + accountGroup.groupId"
    >
      <h1>{{ accountGroup.groupName }}</h1>
      <div
        v-for="(account, index) in accountGroup.accounts"
        :key="index + account.accountNumber"
        :class="`account-row ${
          resizingData.width < 600 ? 'account-column' : ''
        }`"
        @click="
          () => getAccountTransactions({ account: account.accountNumber })
        "
      >
        <h2>
          {{ account.accountNumber }}
        </h2>
        <h2>
          <span>
            {{ account.currencyCode }}
          </span>
          {{ account.balance ? account.balance : account.bookBalance }}
        </h2>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  min-width: 30rem;
  margin-top: 1rem;

  > div {
    border: 1rem solid rgba(0, 128, 0, 0.3);

    h1 {
      color: rgba(128, 128, 128, 0.5);
      background: rgba(0, 128, 0, 0.3);
      padding: 1rem;
    }

    .account-row {
      background: #000;
      background: rgba(0, 128, 0, 0.5);
      display: flex;
      gap: 1rem;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      border-radius: 0.2rem;
      cursor: pointer;

      &:not(:nth-last-child(1)) {
        margin-bottom: 0.25rem;
      }

      h2 {
        padding: 1rem 2.5rem;
        width: 100%;
        text-shadow: 1px 1px 4px black;

        span {
          color: rgba(128, 128, 128, 0.5);
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
          margin-right: 1rem;
        }
      }

      &:hover {
        box-shadow: 1px 2px 4px rgba(128, 128, 128, 0.7);
        color: #fff;
        transition: 0.5s;
        background: rgba(0, 128, 0, 0.6);
      }
    }

    .account-column {
      flex-direction: column;
      gap: 0;
    }
  }
}
</style>
