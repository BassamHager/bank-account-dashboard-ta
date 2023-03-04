<script setup lang="ts">
// components
import TransactionDetails from "./TransactionDetails.vue";
// props
const { transactions } = defineProps(["transactions"]);
</script>

<template>
  <div class="transactions-container">
    <TransactionDetails
      v-for="(transaction, index) in transactions"
      :key="index + transaction.transactionId"
      :transaction="transaction"
    />
  </div>
</template>

<style scoped lang="scss">
.transactions-container {
  margin-top: 2rem;
}
</style>
