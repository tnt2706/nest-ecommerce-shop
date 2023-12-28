import { Module } from '@nestjs/common';

import { AuthController } from './auth.container';
import { RedisModule } from '../redis/redis.module';
import { KeyTokenModule } from '../keytoken/key-token.module';
import { ShopModule } from '../shop/shop.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RedisModule,
    KeyTokenModule,
    ShopModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
