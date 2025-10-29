import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  async getAll(): Promise<Inventory[]> {
    return this.repo.findAll();
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
    const existente = await this.getById(id); // lanza excepción si no existe
    return this.repo.update(existente.id, data);
  }
}
