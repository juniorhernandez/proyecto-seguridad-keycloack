<template>
  <form @submit.prevent="guardar" class="form-container">
    <h2>Registro de Producto</h2>

    <div class="form-grid">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          id="nombre"
          v-model="form.nombre"
          placeholder="Ej. Tornillo galvanizado"
          required
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input
          id="descripcion"
          v-model="form.descripcion"
          placeholder="Ej. Tornillo de acero 3cm"
        />
      </div>

      <div class="form-group">
        <label for="precio">Precio (Q)</label>
        <input
          id="precio"
          v-model.number="form.precio"
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="0.00"
        />
      </div>

      <div class="form-group">
        <label for="stock">Stock</label>
        <input
          id="stock"
          v-model.number="form.stock"
          type="number"
          min="0"
          required
          placeholder="0"
        />
      </div>
    </div>

    <button type="submit" class="btn-guardar">Guardar Producto</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import Swal from 'sweetalert2';

const emit = defineEmits(['refresh']);
const form = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  usuario: 'admin',
});

const guardar = async () => {
  try {
    await api.post('/inventory', form.value);

    form.value = { nombre: '', descripcion: '', precio: 0, stock: 0, usuario: 'admin' };
    emit('refresh');

    await Swal.fire({
      title: '✅ Producto guardado',
      text: 'El producto se ha registrado correctamente.',
      icon: 'success',
      confirmButtonColor: '#1abc9c',
      confirmButtonText: 'Aceptar',
    });
  } catch (error) {
    console.error('❌ Error al guardar producto:', error);

    await Swal.fire({
      title: '❌ Error',
      text: 'Ocurrió un error al guardar el producto. Verifica los datos e intenta nuevamente.',
      icon: 'error',
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Entendido',
    });
  }
};
</script>

<style scoped>
.form-container {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

/* Grid responsivo */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #34495e;
}

input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26, 188, 156, 0.3);
}

.btn-guardar {
  background-color: #1abc9c;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  display: block;
  width: 100%;
  transition: background 0.3s ease;
}

.btn-guardar:hover {
  background-color: #16a085;
}

/* 📱 Responsive */
@media (max-width: 600px) {
  .form-container {
    padding: 1.2rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  .btn-guardar {
    font-size: 0.9rem;
  }
}
</style>
