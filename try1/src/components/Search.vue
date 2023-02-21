<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
// props
const { placeholder, labelText } = defineProps(["placeholder", "labelText"]);
// emits
const emit = defineEmits(["search"]);
// data
const searchTerm = ref<string>("");
const isShowButton = computed(() => {
  return searchTerm.value.trim().length > 0;
});
// methods
const onInput = () => {
  emit("search", searchTerm.value.toLowerCase());
};
const clearSearchInput = () => {
  searchTerm.value = "";
  // reset search results to all as default
  onInput();
  // focus input for the user friendliness
  document.getElementById("search-input")?.focus();
};
</script>

<template>
  <div class="search-wrapper">
    <label for="search-input">{{ labelText }}</label>
    <input
      id="search-input"
      type="text"
      v-model="searchTerm"
      @input="onInput"
      :placeholder="placeholder"
    />
    <button v-if="isShowButton" @click="clearSearchInput">Clear</button>
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  background: rgba($color: #000, $alpha: 0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 0.8rem;
  gap: 1rem;
  padding: 1rem;
  @media screen and (min-width: 40rem) {
    flex-direction: row;
  }
}

label {
  font-size: 1.6rem;
  margin-right: 1rem;
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
</style>
