import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sale } from './sale.entity';

@Injectable()
export class SaleRepository {
  private readonly repo: Repository<Sale>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Sale);
  }

  async findAll(): Promise<Sale[]> {
    try {
      return await this.repo.find({
        relations: ['producto'],
        order: { id: 'DESC' },
      });
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      throw new InternalServerErrorException('Error al obtener las ventas');
    }
  }

  async create(data: Partial<Sale>): Promise<Sale> {
    try {
      const venta = this.repo.create(data);
      return await this.repo.save(venta);
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      throw new InternalServerErrorException('Error al guardar la venta');
    }
  }
}
