import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AccountDetailsView from "@/views/AccountDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/accounts/:accountId",
      name: "account-details",
      component: AccountDetailsView,
    },
  ],
});

export default router;
