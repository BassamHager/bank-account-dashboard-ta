import { createRouter, createWebHistory } from "vue-router";
// context
import { accounts } from "@/context/constants";
// components
import AccountsView from "../views/AccountsView.vue";
import AccountDetailsView from "@/views/AccountDetailsView.vue";

export const routes = [
  {
    path: `${accounts}`,
    name: "accounts",
    component: AccountsView,
  },
  {
    path: `${accounts}/:accountId`,
    name: "account-details",
    component: AccountDetailsView,
  },
  {
    path: "/:catchall(.*)*",
    name: "not-found",
    component: AccountsView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
