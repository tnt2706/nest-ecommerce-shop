import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ContainerConfig } from './configs/container.config';
import { BadRequestException } from '@nestjs/common';
import { SharedService } from './shared/shared.service';

const port = new ContainerConfig().get('port');

const ROOM = 'room1';

@WebSocketGateway(port, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly sharedService: SharedService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log('message receive', payload);
    this.server.to(ROOM).emit('message', 'hello world');
  }

  async handleConnection(client: Socket) {
    console.log('Handle connection');
    // handshake.headers;
    try {
      const { userId, accessToken } = client.handshake.headers || {};
      if (!userId || !accessToken) {
        throw new BadRequestException(
          'Required access token and userId are required',
        );
      }

      // const { isSuccess, signature } = await this.sharedService.verifyToken({
      //   id: userId.toString(),
      //   token: accessToken.toString(),
      // });
    } catch (error) {
      client.disconnect();
    }

    client.join(ROOM);
  }

  handleDisconnect(client: Socket) {
    client.leave(ROOM);
    client.disconnect();
  }

  afterInit(client: Socket) {
    console.log(`Client connected: ${client}`);
  }
}
