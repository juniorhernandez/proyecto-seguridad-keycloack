<template>
  <div class="dashboard-container">
    <Navbar />

    <section class="dashboard-content">
      <h1>Dashboard</h1>

      <div v-if="!dataLoaded" class="loading">
        <p>Cargando estadísticas...</p>
      </div>

      <div v-else class="cards-grid">
        <div class="card total">
          <h2>Total de Productos</h2>
          <p class="value">{{ dashboard.totalProductos }}</p>
        </div>

        <div class="card mayor">
          <h2>Producto con más stock</h2>
          <p class="name">{{ dashboard.productoMayorStock.nombre }}</p>
          <p class="sub">Stock: {{ dashboard.productoMayorStock.stock }}</p>
        </div>

        <div class="card menor">
          <h2>Producto con menos stock</h2>
          <p class="name">{{ dashboard.productoMenorStock.nombre }}</p>
          <p class="sub">Stock: {{ dashboard.productoMenorStock.stock }}</p>
        </div>

        <div class="card valor">
          <h2>Valor total del inventario</h2>
          <p class="value">Q {{ dashboard.totalValorInventario.toFixed(2) }}</p>
        </div>

        <div class="card promedio">
          <h2>Precio promedio</h2>
          <p class="value">Q {{ dashboard.promedioPrecio.toFixed(2) }}</p>
        </div>

        <div class="card ventas">
          <h2>Total de Ventas Realizadas</h2>
          <p class="value">{{ dashboard.totalVentas }}</p>
        </div>

        <div class="card dinero">
          <h2>Total Vendido</h2>
          <p class="value">Q {{ dashboard.totalDineroVendido.toFixed(2) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import api from '@/services/api';

interface Dashboard {
  totalProductos: number;
  productoMayorStock: { nombre: string; stock: number };
  productoMenorStock: { nombre: string; stock: number };
  totalValorInventario: number;
  promedioPrecio: number;
  totalVentas: number;
  totalDineroVendido: number;
}

const dashboard = ref<Dashboard>({
  totalProductos: 0,
  productoMayorStock: { nombre: '', stock: 0 },
  productoMenorStock: { nombre: '', stock: 0 },
  totalValorInventario: 0,
  promedioPrecio: 0,
  totalVentas: 0,
  totalDineroVendido: 0,
});

const dataLoaded = ref(false);

const cargarDashboard = async () => {
  try {
    const res = await api.get('/inventory/dashboard');
    dashboard.value = res.data;
    dataLoaded.value = true;
  } catch (error) {
    console.error('Error al cargar dashboard:', error);
  }
};

onMounted(cargarDashboard);
</script>

<style scoped>
.dashboard-container {
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

h1 {
  text-align: center;
  font-size: clamp(1.4rem, 2vw, 2rem);
  color: #2c3e50;
  margin-bottom: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 0.6rem;
}

.card .value {
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: bold;
  color: #1abc9c;
  margin-top: 0.5rem;
}

.card .name {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  font-weight: 600;
  color: #2c3e50;
}

.card .sub {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.card.total {
  border-top: 6px solid #3498db;
}
.card.mayor {
  border-top: 6px solid #2ecc71;
}
.card.menor {
  border-top: 6px solid #e67e22;
}
.card.valor {
  border-top: 6px solid #9b59b6;
}
.card.promedio {
  border-top: 6px solid #16a085;
}
.card.ventas {
  border-top: 6px solid #1abc9c;
}
.card.dinero {
  border-top: 6px solid #27ae60;
}

@media (max-width: 1024px) {
  .dashboard-content {
    margin: 1.5rem;
    padding: 1.5rem;
  }

  .card {
    padding: 1.2rem;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.4rem;
  }

  .card {
    padding: 1rem;
  }

  .card h2 {
    font-size: 1rem;
  }

  .card .value {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .dashboard-content {
    margin: 1rem;
    padding: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 1rem;
  }

  .card h2 {
    font-size: 0.95rem;
  }

  .card .value {
    font-size: 1.4rem;
  }
}

.loading {
  text-align: center;
  color: #7f8c8d;
  font-size: 1.1rem;
  padding: 2rem 0;
}
</style>
