import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaleService } from './sale.service';
import { Sale } from './sale.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Get()
  getAll(): Promise<Sale[]> {
    return this.service.getAll();
  }

  @Post()
  create(
    @Body()
    data: {
      producto_id: number;
      cantidad: number;
      usuario: string;
      cliente_nombre: string;
      cliente_email?: string;
      cliente_telefono?: string;
      cliente_direccion?: string;
    },
  ): Promise<Sale> {
    return this.service.create(data);
  }
}
