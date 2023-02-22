import { createRouter, createWebHistory } from "vue-router";
// context
import { accounts } from "@/context/constants";
// components
import HomeView from "../views/AccountsView.vue";
import AccountDetailsView from "@/views/AccountDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${accounts}`,
      name: "accounts",
      component: HomeView,
    },
    {
      path: `${accounts}/:accountId`,
      name: "account-details",
      component: AccountDetailsView,
    },
  ],
});

export default router;
