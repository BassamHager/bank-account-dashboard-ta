<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
// components
import SearchTransactions from "./SearchTransactions.vue";
import TransactionList from "./TransactionList.vue";
// types
import type { ITransaction } from "@/types/transaction";
// props
const { accountStatement } = defineProps(["accountStatement"]);
// emits
const emit = defineEmits(["backToList"]);
// data
const searchingTerm = ref<string>("");
const searchedTransactions = computed<ITransaction[]>(() =>
  searchTransactions(searchingTerm.value.trim())
);
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
const getSearchTerm = (term: string): void => {
  searchingTerm.value = term;
};
const searchTransactions = (term: string): ITransaction[] => {
  const searched = accountStatement.transactions.filter(
    (transaction: ITransaction) => {
      return (
        transaction.transactionId.toLowerCase().includes(term) ||
        transaction.bookDate.toLowerCase().includes(term) ||
        transaction.transactionDateTime.toLowerCase().includes(term) ||
        transaction.creditDebitIndicator.toLowerCase().includes(term) ||
        transaction.amount.toString().toLowerCase().includes(term) ||
        transaction.counterpartyAccountNumber.toLowerCase().includes(term) ||
        transaction.counterpartyName.toLowerCase().includes(term) ||
        transaction.description.toLowerCase().includes(term)
      );
    }
  );
  return searched;
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

      <!-- search -->
      <SearchTransactions
        @search="(term:string) => getSearchTerm(term)"
        @clear-input="goBack"
        placeholder="Search transactions..."
        label-text="Search Transactions"
      />

      <!-- transactions  -->
      <TransactionList
        v-if="searchingTerm.length > 0"
        :transactions="searchedTransactions"
      />
      <TransactionList v-else :transactions="accountStatement.transactions" />
    </div>

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
  }
}
</style>
