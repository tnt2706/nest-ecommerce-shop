import { Module } from '@nestjs/common';
import { SocketsController } from './sockets.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [SocketsController],
})
export class SocketsModule {}
