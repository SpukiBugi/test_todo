import Index from "@/vue/pages/index.vue";
import NotePage from "@/vue/pages/note-page.vue";

const routes = [
  {
    name: "main",
    path: "/",
    component: Index,
  },

  {
    name: "note",
    path: "/note/:id",
    component: NotePage,
  }
];

export default routes;