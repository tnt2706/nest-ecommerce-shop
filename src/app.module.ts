import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShopModule } from './modules/shop/shop.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';

import { CommonModule } from './common/common.module';
import { ConfigureModule } from './config/config.module';
import { DatabaseModule } from './dbs/database.module';

@Module({
  imports: [
    ShopModule,
    CommonModule,
    ConfigureModule,
    DatabaseModule,
    OrdersModule,
    ProductsModule,
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
