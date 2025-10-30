<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        Mastery
      </div>

      <div class="nav-links" :class="{ open: isOpen }">
        <router-link to="/" class="nav-item" @click="closeMenu">Home</router-link>
        <router-link to="/productos" class="nav-item" @click="closeMenu">Productos</router-link>
      </div>

      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{ active: isOpen }"></span>
        <span :class="{ active: isOpen }"></span>
        <span :class="{ active: isOpen }"></span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);
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

  .menu-toggle {
    display: flex;
  }
}
</style>
