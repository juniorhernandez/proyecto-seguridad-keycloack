import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '178.16.141.5',
      port: 1433,
      username: 'usrKeycloak',
      password: 'kEycloak@rede$',
      database: 'keycloak',
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo
    }),
    InventoryModule,
  ],
})
export class AppModule {}
