import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
import { InventoryRepository } from './inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
