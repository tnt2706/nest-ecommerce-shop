import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopRepository } from './schemas/repositories/shop.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [AccessController],
  providers: [AccessService, ShopRepository],
})
export class AccessModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'user', method: RequestMethod.GET }, 'user/(.*)')
      .forRoutes(AccessController);
  }
}
