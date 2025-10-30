import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
import { InventoryRepository } from './inventory.repository';
import { SaleModule } from '../sales/sale.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), SaleModule],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
