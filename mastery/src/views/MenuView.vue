<template>
  <div>
    <Navbar />
    <h2>Menú principal</h2>
    <ul>
      <li><router-link to="/productos">Ir a gestión de productos</router-link></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>
