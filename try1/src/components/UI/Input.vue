<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
// props
const { placeholder, labelText, inputName, inputType } = defineProps([
  "placeholder",
  "labelText",
  "inputName",
  "inputType",
]);
// emits // NOTE: I've made sure that these emits' names should match the inputName of this component whenever it's been embedded
const emit = defineEmits(["search", "fromDate", "toDate"]);
// data
const input = ref<string>("");
const isShowButton = computed(() => !!input.value.trim().length);
// methods
const onInput = () => emit(inputName, input.value);
const clearInput = () => {
  input.value = "";
  // reset search results to all as default
  onInput();
  // focus input for the user friendliness
  document.getElementById(inputName)?.focus();
};
</script>

<template>
  <div class="input-wrapper">
    <label :for="inputName">{{ labelText }}</label>
    <input
      :id="inputName"
      :type="inputType"
      v-model="input"
      @input="onInput"
      :placeholder="placeholder"
      :class="input ? 'selected' : ''"
    />
    <button v-if="isShowButton" @click="clearInput">Clear</button>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  background: rgba($color: #000, $alpha: 0.3);
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  gap: 1rem;
  padding: 1rem;
  @media screen and (min-width: 40rem) {
    align-items: center;
    flex-direction: row;
  }

  label {
    font-size: 1.6rem;
    margin-right: 1rem;
    min-width: 15rem;
    @media screen and (min-width: 40rem) {
      text-align: right;
    }
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
    min-width: 20rem;
    &:hover,
    &:focus {
      border: solid rgba($color: #fff, $alpha: 0.3);
    }
    @media screen and (min-width: 40rem) {
      min-width: 31rem;
    }
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

  .selected {
    color: lime;
  }
}
</style>
