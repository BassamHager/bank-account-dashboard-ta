<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
// services
import { getTransactionsByAccountNumber } from "@/services/getTransactions";
import { getAccountBalance } from "@/services/getAccounts";
// components
import AccountActions from "@/components/accounts/AccountActions.vue";
import TransactionList from "@/components/transactions/TransactionList.vue";
// composables
import { formatAccountNumber } from "@/composable/useFormatter";
// types
import type { ITransaction, IAccountStatement } from "@/types/transaction";
// context
import { accounts } from "@/context/constants";

// props
const { accountId } = defineProps(["accountId"]);
// data
const accountStatement = ref<IAccountStatement>();
const updatedTransactions = ref<ITransaction[]>();
const transactions = computed(
  () => updatedTransactions.value || accountStatement.value?.transactions
);
const accountBalance = ref<number>();
// methods
onMounted(async () => {
  accountStatement.value = await getTransactionsByAccountNumber({
    accountNumber: accountId as string,
  });
  accountBalance.value = await getAccountBalance({
    accountNumber: accountId as string,
  });
});
const getProcessedTransactions = (emitValue: ITransaction[]) => {
  if (emitValue) return (updatedTransactions.value = emitValue);
};
</script>

<template>
  <div class="account-details-wrapper">
    <div class="account-details">
      <!-- header: account number & balance -->
      <div class="number-and-currency-container">
        <h1 v-if="accountStatement?.account?.accountNumber">
          {{ formatAccountNumber(accountStatement.account.accountNumber) }}
        </h1>

        <h2>
          <span v-if="accountStatement?.account?.accountNumber">
            {{ accountStatement.account.currencyCode }}
          </span>
          {{ accountBalance }}
        </h2>
      </div>

      <!-- actions -->
      <AccountActions
        v-if="transactions"
        :rawTransactions="transactions"
        @updateTransactions="getProcessedTransactions"
      />

      <!-- total transactions  -->
      <h2 class="total-transactions">
        Total Transactions: {{ transactions?.length || 0 }}
      </h2>

      <!-- transactions  -->
      <TransactionList :transactions="transactions" />
    </div>

    <!-- go back to account-list -->
    <RouterLink class="back-button" :to="accounts">
      <button>Back</button>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.account-details-wrapper {
  margin-top: 1rem;
  background: #1199;
  z-index: 10;
  min-width: 30rem;
  min-height: calc(100vh - 13rem);
  padding: 1rem;
  position: relative;
  overflow: hidden;

  .account-details {
    .number-and-currency-container {
      background: rgba($color: #000, $alpha: 0.2);
      border-radius: 0.8rem;
      width: fit-content;
      margin-left: auto;

      h1 {
        font-size: 1.6rem;
        padding: 2rem;
        background: rgba($color: #000, $alpha: 0.4);
        border-radius: 0.8rem;
        letter-spacing: 0.1rem;
        color: rgba($color: #fff, $alpha: 0.4);

        @media screen and (min-width: 40rem) {
          font-size: 2rem;
        }
      }

      h2 {
        text-align: center;
        font-size: 1.5rem;
        color: rgba($color: #fff, $alpha: 0.5);
        padding: 2rem;

        span {
          color: rgba($color: #fff, $alpha: 0.3);
          margin-right: 1rem;
        }

        @media screen and (min-width: 40rem) {
          font-size: 2rem;
        }
      }

      @media screen and (min-width: 30rem) {
        margin: auto;
      }
    }
  }

  .total-transactions {
    // border: solid;
    margin: 1rem 0 0;
    color: rgba($color: #000, $alpha: 0.5);
    text-shadow: 1px 1px 1px rgba($color: #fff, $alpha: 0.5);
  }

  .back-button {
    text-decoration: none;
    position: absolute;
    top: -3rem;
    left: -3rem;
    width: 10rem;
    height: 10rem;
    border-radius: 40%;
    display: flex;
    align-items: end;
    justify-content: end;
    padding-bottom: 3rem;
    padding-right: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    border: none;
    box-shadow: 1px 1px 8px #000;
    background: hsla(0, 0%, 100%, 0.2);

    &:hover {
      background: green;
      color: #fff;
      box-shadow: 2px 2px 8px #fff;
      transition: 0.5s;
      text-shadow: 1px 1px 1px #000;
    }

    @media screen and (max-width: 40rem) {
      width: 8rem;
      height: 10rem;
      padding-right: 1rem;
    }

    button {
      background: transparent;
      border: none;
      color: #fff;
    }
  }
}
</style>
