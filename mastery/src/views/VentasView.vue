<template>
  <div class="ventas-container">
    <Navbar />
    <section class="ventas-content">
      <h1>Registrar Venta</h1>

      <div class="form-grid">
        <div class="form-section">
          <h2>Datos del Cliente</h2>
          <input v-model="venta.cliente_nombre" placeholder="Nombre del cliente" />
          <input v-model="venta.cliente_email" placeholder="Correo electrónico (opcional)" />
          <input v-model="venta.cliente_telefono" placeholder="Teléfono (opcional)" />
          <textarea v-model="venta.cliente_direccion" placeholder="Dirección (opcional)"></textarea>
        </div>

        <div class="form-section">
          <h2>Producto</h2>
          <select v-model="venta.producto_id">
            <option value="">Selecciona un producto</option>
            <option v-for="p in productos" :key="p.id" :value="p.id">
              {{ p.nombre }} (Stock: {{ p.stock }}) - Q{{ Number(p.precio).toFixed(2) }}
            </option>
          </select>

          <input
            type="number"
            v-model.number="venta.cantidad"
            placeholder="Cantidad"
            min="1"
            :max="selectedProduct?.stock || 0"
          />

          <p v-if="selectedProduct" class="total">
            Total: <strong>Q {{ (selectedProduct.precio * venta.cantidad || 0).toFixed(2) }}</strong>
          </p>

          <button @click="registrarVenta" :disabled="!isValidForm">Registrar Venta</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Navbar from '@/components/Navbar.vue';
import Swal from "sweetalert2";
import api from "@/services/api";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface Venta {
  producto_id: number | "";
  cantidad: number;
  usuario: string;
  cliente_nombre: string;
  cliente_email?: string;
  cliente_telefono?: string;
  cliente_direccion?: string;
}

const productos = ref<Producto[]>([]);
const venta = ref<Venta>({
  producto_id: "",
  cantidad: 1,
  usuario: "admin",
  cliente_nombre: "",
  cliente_email: "",
  cliente_telefono: "",
  cliente_direccion: "",
});

const selectedProduct = computed(() =>
  productos.value.find((p) => p.id === venta.value.producto_id)
);

const isValidForm = computed(() => {
  return venta.value.producto_id !== "" && venta.value.cantidad > 0 && venta.value.cliente_nombre.trim() !== "";
});

const cargarProductos = async () => {
  try {
    const res = await api.get("/inventory");
    productos.value = res.data;
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const registrarVenta = async () => {
  if (!isValidForm.value) {
    Swal.fire("Campos incompletos", "Debes completar todos los campos obligatorios.", "warning");
    return;
  }

  try {
    const payload = {
      producto_id: venta.value.producto_id,
      cantidad: venta.value.cantidad,
      usuario: venta.value.usuario,
      cliente_nombre: venta.value.cliente_nombre,
      cliente_email: venta.value.cliente_email || null,
      cliente_telefono: venta.value.cliente_telefono || null,
      cliente_direccion: venta.value.cliente_direccion || null,
    };

    await api.post("/sales", payload);
    Swal.fire("✅ Venta registrada", "La venta se guardó correctamente y el stock fue actualizado.", "success");

    venta.value = {
      producto_id: "",
      cantidad: 1,
      usuario: "admin",
      cliente_nombre: "",
      cliente_email: "",
      cliente_telefono: "",
      cliente_direccion: "",
    };

    cargarProductos();
  } catch (error) {
    console.error("Error al registrar venta:", error);
    Swal.fire("Error", "No se pudo registrar la venta.", "error");
  }
};

onMounted(cargarProductos);
</script>

<style scoped>
.ventas-container {
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.ventas-content {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.form-section {
  background: #fafafa;
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
}

.form-section h2 {
  margin-bottom: 1rem;
  color: #34495e;
}

input,
textarea,
select {
  width: 100%;
  margin-bottom: 0.8rem;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

button {
  width: 100%;
  background-color: #16a085;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #149174;
}

.total {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .ventas-content {
    margin: 1rem;
    padding: 1.2rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>