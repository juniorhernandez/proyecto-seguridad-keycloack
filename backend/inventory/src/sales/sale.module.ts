import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { InventoryRepository } from '../inventory/inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository, InventoryRepository],
})
export class SaleModule {}
