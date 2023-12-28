import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisService } from './redis.service';
import { getRedisConfig } from 'src/configs/db.config';

@Module({
  // Connect
  // imports: [CacheModule.register<RedisClientOptions>(getRedisConfig())],
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        // isGlobal: true,
        store: redisStore,
        ...getRedisConfig(),
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
