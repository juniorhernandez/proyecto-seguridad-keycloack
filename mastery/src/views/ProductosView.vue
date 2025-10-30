<template>
  <div class="productos-container">
    <Navbar />

    <section class="content">

      <!-- Formulario de registro -->
      <ProductForm @refresh="cargarProductos" />

      <!-- Tabla de productos -->
      <ProductTable :productos="productos" @refresh="cargarProductos" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import ProductForm from '@/components/ProductForm.vue';
import ProductTable from '@/components/ProductTable.vue';
import api from '@/services/api';
import type { Producto } from '@/types/Producto';

const productos = ref<Producto[]>([]);

const cargarProductos = async () => {
  try {
    const res = await api.get('/inventory');
    productos.value = res.data;
  } catch (error) {
    console.error('❌ Error al cargar productos:', error);
  }
};

onMounted(cargarProductos);
</script>

<style scoped>
/* 🌐 Contenedor principal */
.productos-container {
  background-color: #f5f6fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 📦 Sección central */
.content {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

/* 🧱 Título principal */
.title {
  text-align: center;
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
    margin: 1rem;
  }

  .title {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 1rem;
  }

  .title {
    font-size: 1.2rem;
  }
}
</style>
