import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SharedService } from './shared.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    SharedService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: config.get('grpc.clients.authService'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
