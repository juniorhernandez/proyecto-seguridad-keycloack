import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import ProductosView from "@/views/ProductosView.vue";
import VentasView from "@/views/VentasView.vue";
import { useAuthStore } from "@/stores/authStore";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: "/menu",
            name: "menu",
            component: MenuView,
            meta: { requiresAuth: true },
        },
        {
            path: "/productos",
            name: "productos",
            component: ProductosView,
            meta: { requiresAuth: true },
        },
        {
            path: "/ventas",
            name: "ventas",
            component: VentasView,
            meta: { requiresAuth: true },
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/",
        },
    ],
});
// 🧩 Protección de rutas (Keycloak)
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    // Si Keycloak aún no se inicializó, espera su inicialización
    if (authStore.keycloak === null && !authStore.authenticated) {
        await authStore.initKeycloak();
    }
    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (to.meta.requiresAuth && !authStore.authenticated) {
        console.warn("⛔ Acceso denegado. Redirigiendo al login...");
        return next("/");
    }
    next(); // continuar con la navegación
});
export default router;
