import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  NotifyClientsInterface,
  NotifyClientsRequest,
} from './interfaces/socket.interface';

@Injectable()
export class SocketService implements OnModuleInit {
  private gRpcService: NotifyClientsInterface;

  constructor(@Inject('SOCKET_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    // With `SocketioServer` in name of service in file .proto
    this.gRpcService =
      this.client.getService<NotifyClientsInterface>('SocketioServer');
  }

  async sendSocket(request: NotifyClientsRequest): Promise<any> {
    const { jsonMessage } = request;

    request.jsonMessage =
      jsonMessage && typeof jsonMessage === 'string'
        ? jsonMessage
        : JSON.stringify(jsonMessage);

    return this.gRpcService.notifyClients(request);
  }
}
