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
}
