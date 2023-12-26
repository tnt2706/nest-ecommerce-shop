import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('subscriber')
export class SubscriberController {
  constructor(
    @Inject('SUBSCRIPTION_SERVICE')
    private readonly subscriberService: ClientProxy,
  ) {}

  @Get()
  async getAll() {
    return this.subscriberService.send({ cmd: 'get-all-subscriber' }, {});
  }

  @Post('/create-subscriber-event')
  async createSubscribeEvent() {
    console.log('create subscribe event');
    this.subscriberService.emit(
      { cmd: 'create-subscriber-event' },
      {
        _id: 1,
        event: 'subscribe',
      },
    );
    return true;
  }
}
