import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8081', // React development
      /^https:\/\/.*\.tiempos\.website$/, // All subdomains of tiempos.website
    ],
    credentials: true, // Allow credentials if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
