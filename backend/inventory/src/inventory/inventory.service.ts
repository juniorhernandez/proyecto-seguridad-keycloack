import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  async getAll(): Promise<Inventory[]> {
    const inventarios = await this.repo.findAll();
    const activos: Inventory[] = [];

    for (const item of inventarios) {
      if (item.estado === 1) {
        activos.push(item);
      }
    }
    return activos;
  }

  async getById(id: number): Promise<Inventory> {
    const item = await this.repo.findById(id);
    if (!item) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return item;
  }

  async create(data: Partial<Inventory>): Promise<Inventory> {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<Inventory>): Promise<Inventory> {
    return this.repo.update(id, data);
  }

  async desactivar(id: number): Promise<Inventory> {
    const producto = await this.repo.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    producto.estado = 0;
    return this.repo.update(producto.id, producto);
  }

  async getDashboard() {
    const productos = await this.repo.findAll();
    const activos = productos.filter((p) => p.estado === 1);

    if (activos.length === 0) {
      return {
        totalProductos: 0,
        productoMayorStock: null,
        productoMenorStock: null,
        totalValorInventario: 0,
        promedioPrecio: 0,
      };
    }

    const productoMayorStock = activos.reduce((a, b) =>
      a.stock > b.stock ? a : b,
    );
    const productoMenorStock = activos.reduce((a, b) =>
      a.stock < b.stock ? a : b,
    );

    const totalValorInventario = activos.reduce(
      (sum, p) => sum + Number(p.precio) * p.stock,
      0,
    );

    const promedioPrecio =
      activos.reduce((sum, p) => sum + Number(p.precio), 0) / activos.length;

    return {
      totalProductos: activos.length,
      productoMayorStock: {
        id: productoMayorStock.id,
        nombre: productoMayorStock.nombre,
        stock: productoMayorStock.stock,
      },
      productoMenorStock: {
        id: productoMenorStock.id,
        nombre: productoMenorStock.nombre,
        stock: productoMenorStock.stock,
      },
      totalValorInventario: Number(totalValorInventario.toFixed(2)),
      promedioPrecio: Number(promedioPrecio.toFixed(2)),
    };
  }
}
