import { Controller, Post, Req } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post()
  async sendSocketManual(@Req() req: any): Promise<any> {
    return this.socketService.sendSocket(req.body);
  }
}
