import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { KeyTokenModule } from './modules/keytoken/key-token.module';
import { DatabaseModule } from './dbs/database.module';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigsModule } from './configs/config.module';

@Module({
  imports: [
    ConfigsModule,
    AuthModule,
    ShopModule,
    KeyTokenModule,
    DatabaseModule,
    RedisModule,
  ],
  providers: [],
})
export class AppModule {}
