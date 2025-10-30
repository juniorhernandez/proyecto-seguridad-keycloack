import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { SaleModule } from './sales/sale.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nexuscorp.cloud',
      port: 3306,
      username: 'u162879436_mastery',
      password: '4bZ>NJZv9>rO',
      database: 'u162879436_mastery',
      autoLoadEntities: true,
      synchronize: true, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    InventoryModule,
    SaleModule,
  ],
})
export class AppModule {}
