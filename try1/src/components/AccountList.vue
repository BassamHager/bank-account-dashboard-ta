<script setup lang="ts">
import { ref, defineProps } from "vue";
import { RouterLink } from "vue-router";
// composables
import { formatAccountNumber } from "@/composable/useFormatter";
import { useResize } from "@/composable/useResize";
const resizingData = useResize({ doc: document.documentElement });
// props
const { accountGroups } = defineProps(["accountGroups"]);
</script>

<template>
  <main>
    <div
      v-for="(accountGroup, index) in accountGroups"
      :key="index + accountGroup.groupId"
    >
      <h1>{{ accountGroup.groupName }}</h1>

      <RouterLink
        v-for="(account, index) in accountGroup.accounts"
        :to="`/accounts/${account.accountNumber}`"
        :key="index + account.accountNumber"
        :class="`account-row ${
          resizingData.width < 670 ? 'account-column' : ''
        }`"
      >
        <h2>
          {{ formatAccountNumber(account.accountNumber) }}
        </h2>
        <h2>
          <span>
            {{ account.currencyCode }}
          </span>
          {{ account.balance ? account.balance : account.bookBalance }}
        </h2>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  min-width: 30rem;
  margin-top: 1rem;
  z-index: 9;

  > div {
    border: 1rem solid rgba(0, 128, 0, 0.3);

    h1 {
      color: rgba(128, 128, 128, 0.5);
      background: rgba(0, 128, 0, 0.3);
      padding: 1rem;
    }

    .account-row {
      text-decoration: none;
      background: #000;
      background: rgba(0, 128, 0, 0.5);
      display: flex;
      gap: 1rem;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      border-radius: 0.2rem;
      cursor: pointer;

      &:not(:nth-last-child(1)) {
        margin-bottom: 0.25rem;
      }

      h2 {
        padding: 1rem 2.5rem;
        width: 100%;
        text-shadow: 1px 1px 1px #fff;
        color: rgba(0, 0, 0, 0.3);
        span {
          color: rgba(128, 128, 128, 0.5);
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
          margin-right: 1rem;
        }
      }

      &:hover {
        box-shadow: 1px 2px 4px rgba(128, 128, 128, 0.7);
        color: #fff;
        transition: 0.5s;
        background: rgba(0, 128, 0, 0.6);
      }

      /*
      INTENTIONALLY LEFT COMMENT:
       the below css rules can replace (.account-column) However, It's been kept only for demonstrating purposes demoing the know knowledge about composables */
      // @media screen and (max-width: 40rem) {
      //   flex-direction: column;
      //   gap: 0;
      // }
    }

    .account-column {
      flex-direction: column;
      gap: 0;
    }
  }
}
</style>
