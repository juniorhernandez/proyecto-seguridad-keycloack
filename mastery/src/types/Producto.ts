// src/types/Producto.ts
export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  stock: number;
  usuario?: string;
  fecha?: string;
  estado: number;
}
