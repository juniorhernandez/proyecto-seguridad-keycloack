import { defineStore } from "pinia";
import { ref } from "vue";
import Keycloak from "keycloak-js";
export const useAuthStore = defineStore("auth", () => {
    const keycloak = ref(null);
    const token = ref(null);
    const username = ref(null);
    const authenticated = ref(false);
    // 🔹 Log helper (solo si VITE_DEBUG=true)
    const logInfo = (msg) => {
        if (import.meta.env.VITE_DEBUG === "true")
            console.log(msg);
    };
    // 🔹 Inicializar Keycloak
    const initKeycloak = async () => {
        // Reinicia estado previo
        token.value = null;
        username.value = null;
        authenticated.value = false;
        try {
            const kc = new Keycloak({
                url: import.meta.env.VITE_KEYCLOAK_URL ?? "https://18.219.12.172/auth",
                realm: import.meta.env.VITE_KEYCLOAK_REALM ?? "realme-mastery",
                clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? "vue-frontend",
            });
            keycloak.value = kc;
            const authenticatedResult = await kc.init({
                onLoad: "login-required",
                checkLoginIframe: false,
                redirectUri: window.location.origin, // ✅ adapta automáticamente
            });
            authenticated.value = authenticatedResult;
            if (authenticatedResult) {
                token.value = kc.token ?? null;
                username.value = kc.tokenParsed?.preferred_username ?? null;
                startTokenRefresh();
                logInfo(`✅ Sesión iniciada como: ${username.value}`);
            }
            else {
                logInfo("⚠️ Usuario no autenticado");
            }
        }
        catch (err) {
            console.error("❌ Error al inicializar Keycloak:", err);
        }
    };
    // 🔹 Refrescar token periódicamente
    const startTokenRefresh = () => {
        setInterval(async () => {
            if (keycloak.value && authenticated.value) {
                try {
                    const refreshed = await keycloak.value.updateToken(60);
                    if (refreshed) {
                        token.value = keycloak.value.token ?? null;
                        logInfo("🔄 Token refrescado automáticamente");
                    }
                }
                catch (err) {
                    console.warn("⚠️ Token expirado o inválido. Cerrando sesión...");
                    await logout();
                }
            }
        }, 60000); // cada 60 segundos
    };
    // 🔹 Cerrar sesión y limpiar store
    const logout = async () => {
        try {
            if (keycloak.value) {
                await keycloak.value.logout({
                    redirectUri: window.location.origin, // 🔁 vuelve al inicio
                });
            }
        }
        catch (err) {
            console.error("❌ Error al cerrar sesión:", err);
        }
        finally {
            token.value = null;
            username.value = null;
            authenticated.value = false;
            logInfo("👋 Sesión cerrada correctamente");
        }
    };
    return {
        keycloak,
        token,
        username,
        authenticated,
        initKeycloak,
        logout,
    };
});
