import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { KeyTokenModule } from './modules/keytoken/key-token.module';
import { DatabaseModule } from './dbs/database.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    ShopModule,
    KeyTokenModule,
    DatabaseModule,
    RedisModule,
  ],
  providers: [],
})
export class AppModule {}
