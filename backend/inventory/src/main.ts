import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS solo para el frontend autorizado
  app.enableCors({
    origin: 'https://178.16.141.5',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
