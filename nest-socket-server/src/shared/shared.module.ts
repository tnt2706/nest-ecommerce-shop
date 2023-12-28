import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { getGrpcConfig } from 'src/configs/grpc.config';
import { SharedService } from './shared.service';

@Module({
  providers: [
    SharedService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: getGrpcConfig('authService'),
        });
      },
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
