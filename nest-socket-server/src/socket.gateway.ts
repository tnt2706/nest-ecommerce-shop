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
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log('message receive', payload);
    this.server.to(ROOM).emit('message', 'hello world');
  }

  handleConnection(client: Socket) {
    // handshake.headers;
    // try {

    // } catch (error) {
    //   client.disconnect();
    // }

    client.join(ROOM);
  }

  handleDisconnect(client: Socket) {
    client.leave(ROOM);
    client.disconnect();
  }

  afterInit(client: Socket) {}
}
