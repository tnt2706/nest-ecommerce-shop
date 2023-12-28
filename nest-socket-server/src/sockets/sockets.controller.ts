import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotifyClientsRequest } from './interfaces/socket.interface';
import { EventsGateway } from 'src/events/events.gateway';

@Controller()
export class SocketsController {
  constructor(private readonly event: EventsGateway) {}

  @GrpcMethod('SocketioServer', 'NotifyClients')
  async NotifyClients(request: NotifyClientsRequest): Promise<any> {
    this.event.sendSocket();
    return { isSuccess: true };
  }
}
