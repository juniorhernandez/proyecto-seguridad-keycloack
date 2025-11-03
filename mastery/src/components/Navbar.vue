<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- LOGO -->
      <router-link to="/" class="logo">
        Mastery
      </router-link>

      <!-- MENU RESPONSIVE -->
      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{ active: isOpen }"></span>
        <span :class="{ active: isOpen }"></span>
        <span :class="{ active: isOpen }"></span>
      </div>

      <!-- LINKS -->
      <div class="nav-links" :class="{ 'nav-active': isOpen }">
        <router-link to="/" class="nav-item" @click="closeMenu">Home</router-link>
        <router-link to="/productos" class="nav-item" @click="closeMenu">Productos</router-link>
        <router-link to="/ventas" class="nav-item" @click="closeMenu">Ventas</router-link>

        <!-- USUARIO AUTENTICADO -->
        <div v-if="authStore.authenticated" class="user-section">
          <span class="user-name">{{ authStore.username }}</span>
          <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const isOpen = ref(false);

const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);

// ✅ Cierra sesión correctamente y espera el proceso
const handleLogout = async () => {
  try {
    // Primero mostrar confirmación
    const confirm = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro que deseas cerrar la sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      // Mostrar loading mientras se procesa
      Swal.fire({
        title: 'Cerrando sesión...',
        text: 'Por favor espera...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await authStore.logout(); // Espera a que Keycloak redirija
    }
  } catch (err) {
    console.error("❌ Error al cerrar sesión:", err);
    // Mostrar error si falla
    await Swal.fire({
      title: 'Error',
      text: 'No se pudo cerrar la sesión. Por favor intenta de nuevo.',
      icon: 'error'
    });
  }
};
</script>

<style scoped>
.navbar {
  background-color: #1e2a38;
  color: #ecf0f1;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.nav-item:hover {
  color: #1abc9c;
  border-bottom: 2px solid #1abc9c;
}

.router-link-active {
  color: #1abc9c;
  font-weight: bold;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 1px solid #34495e;
  padding-left: 1rem;
}

.user-name {
  font-size: 0.95rem;
  color: #ecf0f1;
}

.logout-btn {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #ecf0f1;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.menu-toggle span.active:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}
.menu-toggle span.active:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.active:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #1e2a38;
    text-align: center;
    padding: 1rem 0;
    gap: 1rem;
    transform: translateY(-200%);
    transition: transform 0.4s ease;
  }

  .nav-links.open {
    transform: translateY(0);
  }

  .user-section {
    flex-direction: column;
    border-left: none;
    padding-left: 0;
    margin-top: 1rem;
  }

  .logout-btn {
    width: 60%;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
