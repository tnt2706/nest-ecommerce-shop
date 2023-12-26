import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { GrpcConfig } from './configs/grpc.config';

async function bootstrap() {
  const grpcConfig = new GrpcConfig({
    packageName: 'socketio',
    protoFile: 'socketio_server.proto',
  });

  console.log(grpcConfig.get());

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: grpcConfig.get(),
    },
  );

  await app.listen();
}

bootstrap();
