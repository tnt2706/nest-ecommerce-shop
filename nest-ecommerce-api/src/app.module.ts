import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShopModule } from './modules/shop/shop.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { CatModule } from './modules/cat/cat.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriberModule } from './modules/subscriber/subscriber.module';

import { CommonModule } from './common/common.module';
import { ConfigsModule } from './config/config.module';
import { DatabaseModule } from './dbs/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ShopModule,
    CommonModule,
    ConfigsModule,
    DatabaseModule,
    OrderModule,
    ProductModule,
    CatModule,
    AuthModule,
    SubscriberModule,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60,
    //     limit: 5,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
