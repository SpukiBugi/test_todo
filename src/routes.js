import Index from "@/vue/pages/index.vue";
import CardPage from "@/vue/pages/card-page.vue";

const routes = [
  {
    name: "main",
    path: "/",
    component: Index,
  },

  {
    name: "card",
    path: "/card",
    component: CardPage,
  }
];

export default routes;