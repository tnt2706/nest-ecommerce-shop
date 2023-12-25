import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShopModule } from './modules/shop/shop.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/product/product.module';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';

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
    OrdersModule,
    ProductModule,
    CatsModule,
    AuthModule,
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
