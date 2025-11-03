import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/authStore";
const app = createApp(App);
app.use(createPinia());
app.use(router);
(async () => {
    const authStore = useAuthStore();
    try {
        // 🧠 Inicializa Keycloak antes de montar la app
        await authStore.initKeycloak();
        console.log("✅ Keycloak inicializado correctamente");
        app.mount("#app");
    }
    catch (err) {
        console.error("❌ Error al inicializar Keycloak:", err);
        // Puedes montar la app igual para mostrar un mensaje de error o vista limitada
        app.mount("#app");
    }
})();
