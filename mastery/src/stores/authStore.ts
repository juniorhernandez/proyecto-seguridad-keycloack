import { defineStore } from "pinia";
import { ref } from "vue";
import Keycloak, { KeycloakInstance } from "keycloak-js";

export const useAuthStore = defineStore("auth", () => {
  const keycloak = ref<KeycloakInstance | null>(null);
  const token = ref<string | null>(null);
  const username = ref<string | null>(null);
  const authenticated = ref(false);

  // 🔹 Log helper (solo si VITE_DEBUG=true)
  const logInfo = (msg: string) => {
    if (import.meta.env.VITE_DEBUG === "true") console.log(msg);
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
      } else {
        logInfo("⚠️ Usuario no autenticado");
      }
    } catch (err) {
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
        } catch (err) {
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
        // Intentamos usar el método de la librería.
        // Si por alguna razón la redirección no ocurre (config de cliente en Keycloak),
        // el fallback forzará la redirección al endpoint de logout.
        const redirectUri = window.location.origin;

        // Llamada normal al logout
        const logoutPromise = keycloak.value.logout({ redirectUri });

        // Timeout para detectar que no hubo navegación (p.ej. 2.5s)
        const timeout = new Promise((resolve) => setTimeout(resolve, 2500, 'timeout'));

        const res = await Promise.race([logoutPromise, timeout]);

        // Si la promesa de logout no provocó navegación (se cumple el timeout), forzamos la URL
        if (res === 'timeout') {
          try {
            const kcUrl = import.meta.env.VITE_KEYCLOAK_URL ?? 'https://18.219.12.172/auth';
            const realm = import.meta.env.VITE_KEYCLOAK_REALM ?? 'realme-mastery';
            const logoutEndpoint = `${kcUrl.replace(/\/$/, '')}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(redirectUri)}`;
            // Forzamos navegación al endpoint de logout
            window.location.href = logoutEndpoint;
            // Dejamos que el navegador haga la navegación; si no, se seguirá al finally
          } catch (err) {
            console.warn('⚠️ Fallback de logout falló:', err);
          }
        }
      }
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err);
    } finally {
      // Limpiamos el estado local siempre (aunque la navegación ocurra)
      token.value = null;
      username.value = null;
      authenticated.value = false;
      logInfo('👋 Sesión cerrada correctamente');
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
