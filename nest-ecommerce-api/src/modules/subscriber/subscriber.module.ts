import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { SubscriberController } from './subscriber.controller';

@Module({
  controllers: [SubscriberController],
  providers: [
    {
      provide: 'SUBSCRIPTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const subscriberServiceOptions = configService.get('subscriberService');
        return ClientProxyFactory.create(subscriberServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class SubscriberModule {}
