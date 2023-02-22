<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
// components
import Input from "@/components/UI/Input.vue";
// types
import type { ITransaction } from "@/types/transaction";
// props
const { rawTransactions } = defineProps(["rawTransactions"]);
// emits
const emit = defineEmits(["updateTransactions"]);
// data
const searchingTerm = ref<string>("");
const filterFrom = ref<string>("");
const filterTo = ref<string>("");
// methods
const getEmitValue = (emitValue: string, emitName: string) => {
  if (emitName === "search") searchingTerm.value = emitValue;
  if (emitName === "fromDate") filterFrom.value = emitValue;
  if (emitName === "toDate") filterTo.value = emitValue;
  processTransactions();
};
const processTransactions = (): void => {
  // constants
  const searchValue = searchingTerm.value.trim().toLowerCase();
  const fromValue = filterFrom.value;
  const toValue = filterTo.value;

  // return all if no actions made
  if (!searchValue && !fromValue && !toValue) {
    emit("updateTransactions", rawTransactions);
    return;
  }

  // searching process
  let searched: ITransaction[] = [];

  if (searchValue) {
    searched = rawTransactions.filter((transaction: ITransaction) => {
      return (
        transaction.transactionId.toLowerCase().includes(searchValue) ||
        transaction.bookDate.toLowerCase().includes(searchValue) ||
        transaction.transactionDateTime.toLowerCase().includes(searchValue) ||
        transaction.creditDebitIndicator.toLowerCase().includes(searchValue) ||
        transaction.amount.toString().toLowerCase().includes(searchValue) ||
        transaction.counterpartyAccountNumber
          .toLowerCase()
          .includes(searchValue) ||
        transaction.counterpartyName.toLowerCase().includes(searchValue) ||
        transaction.description.toLowerCase().includes(searchValue)
      );
    });

    // if there's a searchValue & it's not returning results => should emit an empty array even if other inputs/filters have values
    if (!searchValue.length) {
      emit("updateTransactions", searched);
      return;
    }
  }

  // filtering process
  let filtered: ITransaction[] = [];

  if (fromValue) {
    // if there's a searchValue => filter on top of the searched, else: filter the raw
    filtered = searchValue ? searched : rawTransactions;
    filtered = filtered.filter(
      (transaction) => transaction.bookDate >= fromValue
    );
  }

  if (toValue) {
    // if there's a fromValue => filter on top of the filtered, else if there's a searchValue => filter the searched, else: filter the raw
    filtered = fromValue ? filtered : searchValue ? searched : rawTransactions;
    filtered = filtered.filter((transaction) => {
      return transaction.bookDate <= toValue;
    });
  }

  if (searchValue && !fromValue && !toValue) {
    // if there's a searchValue & there's no filtering values => emit the searched
    // NOTE: as we reached this line, we can make sure that searched.length > 0
    emit("updateTransactions", searched);
    return;
  }

  // reaching this line means that at least one of the filters (from | to) has a value => we emit their accumulated result
  emit("updateTransactions", filtered);
};
</script>

<template>
  <div class="actions-wrapper">
    <!-- search -->
    <Input
      placeholder="type..."
      labelText="Search Transactions"
      inputName="search"
      inputType="text"
      @search="(val:string) => getEmitValue(val, 'search')"
    />

    <!-- filter from -->
    <Input
      labelText="From: "
      inputName="fromDate"
      inputType="date"
      @fromDate="(val:string) => getEmitValue(val, 'fromDate')"
    />

    <!-- filter to -->
    <Input
      labelText="To: "
      inputName="toDate"
      inputType="date"
      @toDate="(val:string) => getEmitValue(val, 'toDate')"
    />
  </div>
</template>

<style scoped lang="scss">
.actions-wrapper {
  margin-top: 2rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  > div {
    width: 100%;
  }
}
</style>
