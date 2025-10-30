import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  getAll(): Promise<Inventory[]> {
    return this.service.getAll();
  }

  @Get('dashboard')
  getDashboard() {
    return this.service.getDashboard();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Inventory> {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() data: Partial<Inventory>): Promise<Inventory> {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.service.update(id, data);
  }

  @Put(':id/desactivar')
  async desactivar(@Param('id') id: number) {
    return this.service.desactivar(Number(id));
  }
}
