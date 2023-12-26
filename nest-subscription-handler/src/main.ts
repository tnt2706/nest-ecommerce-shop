import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ContainerConfig } from './configs/container.config';

async function bootstrap() {
  const containerConfig = new ContainerConfig();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: containerConfig.get('host'),
        port: containerConfig.get('port'),
      },
    },
  );

  await app.listen();
}

bootstrap();
