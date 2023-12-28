import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = app.get(ConfigService).get('grpc.server');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options,
  });

  await app.startAllMicroservices();
}

bootstrap();
