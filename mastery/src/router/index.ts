import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import ProductosView from "@/views/ProductosView.vue";
import VentasView from "@/views/VentasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuView,
    },
    {
      path: "/productos",
      name: "productos",
      component: ProductosView,
    },
    {
      path: "/ventas",
      name: "ventas",
      component: VentasView,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});

export default router;
