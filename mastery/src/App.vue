<template>
  <div>
    <div v-if="!ready" class="loading-screen">
      <p>🔐 Iniciando sesión segura...</p>
    </div>

    <div v-else class="main-container">
      <Navbar v-if="authenticated" />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import Navbar from '@/components/Navbar.vue';

const authStore = useAuthStore();
const ready = ref(false);
const authenticated = ref(false);

onMounted(() => {
  // Esperar hasta que Keycloak esté listo y autenticado
  const interval = setInterval(() => {
    if (authStore.keycloak) {
      authenticated.value = authStore.authenticated;
      ready.value = true;
      clearInterval(interval);
    }
  }, 300);
});
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f6fa;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding-top: 2rem; /* Espacio para el navbar fijo */
  min-height: calc(100vh - 64px); /* Altura total menos altura del navbar */
}

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f6fa;
  font-size: 1.3rem;
  color: #555;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

@media (max-width: 992px) {
  .main-content {
    padding: 1.5rem;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    max-width: 95%;
  }
  h1, h2 {
    font-size: 1.4rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.8rem;
    width: 100%;
  }
  h1, h2 {
    font-size: 1.2rem;
  }
}
</style>
