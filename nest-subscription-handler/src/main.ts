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

  /**
   * OR
   */

  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  // await app.startAllMicroservices();
  // await app.listen();
}

bootstrap();
