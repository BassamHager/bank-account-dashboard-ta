<script setup lang="ts">
import { defineProps } from "vue";
// props
const { transaction } = defineProps(["transaction"]);
// methods
</script>

<template>
  <div class="transaction-details">
    <h3><span>Transaction Id: </span> {{ transaction.transactionId }}</h3>
    <h3>
      <span>Book Date: </span>
      {{ new Date(transaction.bookDate).toLocaleDateString() }}
    </h3>
    <h3><span>Transaction Id: </span> {{ transaction.transactionId }}</h3>
    <h3>
      <span>Transaction Date/Time: </span>
      {{ new Date(transaction.transactionDateTime).toLocaleString() }}
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
</template>

<style scoped lang="scss">
.transaction-details {
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
</style>
