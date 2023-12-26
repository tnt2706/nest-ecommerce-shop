import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('subscriber')
export class SubscriberController {
  @MessagePattern({ cmd: 'get-all-subscriber' })
  async getAll() {
    return [
      {
        _id: 1,
        name: 'Subscriber1',
      },
      {
        _id: 2,
        name: 'Subscriber2',
      },
    ];
  }

  @EventPattern({ cmd: 'create-subscriber-event' })
  async createSubscribeEvent(data) {
    console.log('createSubscribeEvent ::: ', data);
  }
}
