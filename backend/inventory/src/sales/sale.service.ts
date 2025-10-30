import { Injectable, BadRequestException } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { InventoryRepository } from '../inventory/inventory.repository';
import { Sale } from './sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly repo: SaleRepository,
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  async getAll(): Promise<Sale[]> {
    return this.repo.findAll();
  }

  async create(data: {
    producto_id: number;
    cantidad: number;
    usuario: string;
    cliente_nombre: string;
    cliente_email?: string;
    cliente_telefono?: string;
    cliente_direccion?: string;
  }): Promise<Sale> {
    const producto = await this.inventoryRepo.findById(data.producto_id);
    if (!producto) {
      throw new BadRequestException('Producto no encontrado');
    }

    if (producto.stock < data.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente para la venta. Disponible: ${producto.stock}`,
      );
    }

    const total = Number(producto.precio) * data.cantidad;
    producto.stock -= data.cantidad;
    await this.inventoryRepo.update(producto.id, producto);

    const venta = await this.repo.create({
      producto_id: producto.id,
      cantidad: data.cantidad,
      total,
      usuario: data.usuario,
      cliente_nombre: data.cliente_nombre,
      cliente_email: data.cliente_email ?? null,
      cliente_telefono: data.cliente_telefono ?? null,
      cliente_direccion: data.cliente_direccion ?? null,
    });

    return venta;
  }
}
