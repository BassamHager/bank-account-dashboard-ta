<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
// components
import TransactionList from "./TransactionList.vue";
import AccountActions from "@/components/AccountActions.vue";
// types
import type { ITransaction } from "@/types/transaction";
// props
const { accountStatement } = defineProps(["accountStatement"]);
// emits
const emit = defineEmits(["backToList"]);
// data
const transactions = ref<ITransaction[]>(accountStatement.transactions);
// methods
const goBack = (): void => {
  emit("backToList", false);
};
const formatAccountNumber = (text: string) => {
  const textArr = text.split("");
  textArr.splice(4, 0, " ");
  textArr.splice(9, 0, " ");
  return textArr.join("");
};
const getProcessedTransactions = (emitValue: ITransaction[]) => {
  if (emitValue) transactions.value = emitValue;
};
</script>

<template>
  <div class="account-details-wrapper">
    <div class="account-details">
      <!-- header: account number & balance -->
      <div class="number-and-currency-container">
        <h1>
          {{ formatAccountNumber(accountStatement.account.accountNumber) }}
        </h1>

        <h2>
          <span>
            {{ accountStatement.account.currencyCode }}
          </span>
          {{ accountStatement.account.balance }}
        </h2>
      </div>

      <!-- actions -->
      <AccountActions
        :rawTransactions="accountStatement.transactions"
        @updateTransactions="getProcessedTransactions"
      />

      <!-- transactions  -->
      <h2 class="total-transactions">
        Total Transactions: {{ transactions.length }}
      </h2>
      <TransactionList :transactions="transactions" />
    </div>

    <!-- go back to account-list -->
    <button @click="goBack" class="back-button">Back</button>
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
  }
}
</style>
