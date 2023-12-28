import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  providers: [
    SocketService,
    {
      provide: 'SOCKET_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: configService.get('socketServer'),
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [SocketController],
  exports: [SocketService],
})
export class SocketModule {}
