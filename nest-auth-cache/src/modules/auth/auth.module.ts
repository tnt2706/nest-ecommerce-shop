import { Module } from '@nestjs/common';

import { AuthController } from './auth.container';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [AuthController],
})
export class AuthModule {}
