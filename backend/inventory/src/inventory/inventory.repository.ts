import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryRepository {
  private readonly repo: Repository<Inventory>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repo = this.dataSource.getRepository(Inventory);
  }

  findAll(): Promise<Inventory[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Inventory | null> {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Inventory>): Promise<Inventory> {
    const nuevo = this.repo.create(data);
    return this.repo.save(nuevo);
  }

  async update(id: number, data: Partial<Inventory>): Promise<Inventory> {
    const existente = await this.repo.findOneBy({ id });
    if (!existente) {
      throw new Error(`Inventario con ID ${id} no encontrado`);
    }
    const actualizado = this.repo.merge(existente, data);
    return this.repo.save(actualizado);
  }
}
