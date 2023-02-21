<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
// emits
const emit = defineEmits(["filterFrom", "filterTo"]);
// data
const selectedFromDate = ref("");
const selectedToDate = ref("");
const isShowButton = computed(() => {
  return (
    selectedFromDate.value.trim().length || selectedToDate.value.trim().length
  );
});
// methods
const onInputFrom = () => {
  emit("filterFrom", selectedFromDate.value.toLowerCase());
};
const onInputTo = () => {
  emit("filterTo", selectedToDate.value.toLowerCase());
};
const clearFilterInput = () => {
  selectedFromDate.value = "";
  selectedToDate.value = "";
  // reset filtered results back to all as default
  onInputFrom();
  onInputTo();
  // focus input for the user friendliness
  document.getElementById("date-input-from")?.focus();
};
</script>

<template>
  <div class="filter-wrapper">
    <div>
      <label for="date-filter-from">From </label>
      <input
        type="date"
        id="date-input-from"
        v-model="selectedFromDate"
        @input="onInputFrom"
        :class="selectedFromDate ? 'selected' : ''"
      />
    </div>
    <div>
      <label for="date-filter-to">To </label>
      <input
        type="date"
        id="date-input-to"
        v-model="selectedToDate"
        @input="onInputTo"
        :class="selectedToDate ? 'selected' : ''"
      />
    </div>
    <button v-if="isShowButton" @click="clearFilterInput">Clear</button>
  </div>
</template>

<style scoped lang="scss">
.filter-wrapper {
  background: rgba($color: #000, $alpha: 0.3);
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  @media screen and (min-width: 40rem) {
    flex-direction: row;
  }

  div {
    display: flex;
    align-items: center;
  }

  label {
    font-size: 1.6rem;
    display: block;
    width: 5rem;
    text-align: right;
    padding-right: 1rem;
  }

  input,
  button {
    padding: 1rem;
    color: rgba($color: #fff, $alpha: 0.8);
    font-size: 1.8rem;
    border-radius: 0.8rem;
    border: solid transparent;
  }

  input {
    background: rgba($color: #fff, $alpha: 0.1);
    color: rgba($color: #fff, $alpha: 0.5);
    &:hover,
    &:focus {
      border: solid rgba($color: #fff, $alpha: 0.3);
    }
  }

  .selected {
    color: lime;
  }

  button {
    background: rgba($color: #000, $alpha: 0.4);
    cursor: pointer;
    margin-left: 1rem;
    border: solid rgba($color: #fff, $alpha: 0.1);
    &:hover {
      background: #000;
      color: #fff;
      box-shadow: 2px 2px 8px rgba($color: #fff, $alpha: 0.3);
      transition: 0.3s;
    }
  }
}
</style>
