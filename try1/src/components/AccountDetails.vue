<script setup lang="ts">
import { defineProps, onMounted, defineEmits } from "vue";
// props
const { accountStatement } = defineProps(["accountStatement"]);
// emits
const emit = defineEmits(["showList"]);
// methods
const goBack = () => {
  emit("showList", false);
};
const formatAccountNumber = (text: string) => {
  const textArr = text.split("");
  textArr.splice(4, 0, " ");
  textArr.splice(9, 0, " ");
  return textArr.join("");
};
</script>

<template>
  <div class="account-details-wrapper">
    <div class="account-details">
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

      <!-- transactions history -->
      <div class="transactions-history-container">
        <div
          v-for="(transaction, index) in accountStatement.transactions"
          :key="index + transaction.transactionId"
          class="transaction-history"
        >
          <h3><span>Transaction Id: </span> {{ transaction.transactionId }}</h3>
          <h3><span>Book Date: </span> {{ transaction.bookDate }}</h3>
          <h3><span>Transaction Id: </span> {{ transaction.transactionId }}</h3>
          <h3>
            <span>Transaction Date/Time: </span>
            {{ transaction.transactionDateTime }}
          </h3>
          <h3>
            <span>Credit/Debit Indicator: </span>
            {{ transaction.creditDebitIndicator }}
          </h3>
          <h3>
            <span>Amount: </span>
            {{ transaction.amount }}
          </h3>
          <h3>
            <span>Counter Party Account Number: </span>
            {{ transaction.counterpartyAccountNumber }}
          </h3>
          <h3>
            <span>Counter Party Name: </span>
            {{ transaction.counterpartyName }}
          </h3>
          <h3>
            <span>Description: </span>
            {{ transaction.description }}
          </h3>
        </div>
      </div>
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

    .transactions-history-container {
      margin-top: 2rem;

      .transaction-history {
        border-radius: 0.8rem;
        background: rgba($color: #000, $alpha: 0.3);
        border-bottom: 1px solid #000;
        padding: 1rem;
        margin-top: 1rem;

        h3 {
          color: rgba($color: #fff, $alpha: 0.7);
          padding: 0.5rem 0;
          span {
            color: rgba($color: #fff, $alpha: 0.4);
            margin-right: 1rem;
          }
        }
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
