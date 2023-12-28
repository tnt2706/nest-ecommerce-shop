import { Module } from '@nestjs/common';
import { SocketsController } from './sockets.controller';

@Module({
  controllers: [SocketsController],
})
export class SocketsModule {}
