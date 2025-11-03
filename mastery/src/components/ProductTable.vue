<template>
  <div class="table-container">
    <h2>Lista de Productos</h2>

    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio (Q)</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>Q {{ Number(p.precio).toFixed(2) }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button class="btn btn-edit" @click="abrirModal(p)">Editar</button>
            <button class="btn btn-delete" @click="eliminar(p.id)">Eliminar</button>
          </td>
        </tr>

        <tr v-if="!productos || productos.length === 0">
          <td colspan="5" class="no-data">No hay productos registrados</td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="mostrarModal" @click.self="cerrarModal">
      <div class="modal-content">
        <h3>Editar Producto</h3>
        <form @submit.prevent="guardarCambios">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input 
              id="nombre" 
              v-model="productoEditando.nombre" 
              class="form-input" 
              placeholder="Nombre"
              required
            />
          </div>

          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <input 
              id="descripcion" 
              v-model="productoEditando.descripcion" 
              class="form-input" 
              placeholder="Descripción"
            />
          </div>

          <div class="form-group">
            <label for="precio">Precio:</label>
            <input 
              id="precio" 
              v-model="productoEditando.precio" 
              type="number" 
              step="0.01" 
              min="0" 
              class="form-input" 
              placeholder="Precio"
              required
            />
          </div>

          <div class="form-group">
            <label for="stock">Stock:</label>
            <input 
              id="stock" 
              v-model="productoEditando.stock" 
              type="number" 
              min="0" 
              class="form-input" 
              placeholder="Stock"
              required
            />
          </div>

          <div class="modal-buttons">
            <button type="submit" class="btn btn-save">Guardar cambios</button>
            <button type="button" class="btn btn-cancel" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import api from '@/services/api';
import Swal from 'sweetalert2';
import type { Producto } from '@/types/Producto';

const props = defineProps<{ productos: Producto[] }>();
const emit = defineEmits(['refresh']);

const mostrarModal = ref(false);
const productoEditando = ref<Producto>({} as Producto);

const abrirModal = (producto: Producto) => {
  productoEditando.value = { ...producto };
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  productoEditando.value = {} as Producto;
};

const guardarCambios = async () => {
  try {
    // Usamos claves tipadas para evitar errores de indexado dinámico
    const datosActualizados = {} as Partial<Producto>;
    const camposAComparar: (keyof Producto)[] = [
      'nombre',
      'descripcion',
      'precio',
      'stock',
    ];

    for (const campo of camposAComparar) {
      const nuevoValor = productoEditando.value[campo];
      const valorOriginal = props.productos.find(p => p.id === productoEditando.value.id)?.[campo];

      if (nuevoValor !== valorOriginal) {
        datosActualizados[campo] = nuevoValor as any;
      }
    }

    if (Object.keys(datosActualizados).length === 0) {
      await Swal.fire('ℹ️ Sin cambios', 'No se detectaron modificaciones.', 'info');
      cerrarModal();
      return;
    }

    await api.put(`/inventory/${productoEditando.value.id}`, datosActualizados);
    await Swal.fire('✅ Actualizado', 'El producto fue actualizado correctamente.', 'success');
    emit('refresh');
    cerrarModal();
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    await Swal.fire('❌ Error', 'Ocurrió un error al actualizar el producto.', 'error');
  }
};



const eliminar = async (id: number) => {
  const result = await Swal.fire({
    title: '¿Eliminar producto?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    await api.put(`/inventory/${id}/desactivar`);
    emit('refresh');
    Swal.fire('Eliminado', 'El producto fue eliminado correctamente.', 'success');
  }
};
</script>

<style scoped>
.table-container {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
  transition: all 0.3s ease;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 600px;
}

.styled-table th {
  background-color: #1e2a38;
  color: #ecf0f1;
  padding: 12px;
  text-align: center;
}

.styled-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
  color: #2c3e50;
}

.styled-table tr:hover {
  background-color: #f5f6fa;
}

.no-data {
  text-align: center;
  font-style: italic;
  color: #888;
}

.btn {
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-edit {
  background-color: #3498db;
  color: white;
  margin-right: 6px;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .styled-table {
    font-size: 0.85rem;
  }

  th,
  td {
    padding: 8px;
  }

  .btn {
    padding: 5px 8px;
    font-size: 0.8rem;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-save {
  background-color: #2ecc71;
  color: white;
}

.btn-save:hover {
  background-color: #27ae60;
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}
</style>
