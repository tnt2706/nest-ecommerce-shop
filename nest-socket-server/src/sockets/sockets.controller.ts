import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotifyClientsRequest } from './interfaces/socket.interface';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class SocketsController {
  @GrpcMethod('SocketioServer', 'NotifyClients')
  async NotifyClients(
    request: NotifyClientsRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<any> {
    return { isSuccess: true };
  }
}
