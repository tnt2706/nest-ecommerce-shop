import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BadRequestException } from '@nestjs/common';
import { SharedService } from './shared/shared.service';

const PORT = parseInt(process.env.WS_PORT || '80', 10);

const ROOM = 'room1';

@WebSocketGateway(PORT, {
  cors: { origin: '*' },
  // transports: ['websocket'],
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
    try {
      console.log(`Handle connection ${client.id}`);

      const { user_id, access_token } = client.handshake.headers || {};

      if (!user_id || !access_token) {
        throw new BadRequestException('Missing headers socket');
      }

      const { isSuccess, signature } = await this.sharedService.verifyToken({
        id: user_id.toString(),
        token: access_token.toString(),
      });
    } catch (error) {
      client.disconnect();
    }

    client.join(ROOM);
  }

  handleDisconnect(client: Socket) {
    console.log(`Handle disconnect ${client.id}`);
    client.leave(ROOM);
    client.disconnect();
  }

  afterInit(client: Socket) {
    console.log(`Client init connect`);
  }
}
