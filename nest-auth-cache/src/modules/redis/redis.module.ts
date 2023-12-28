import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';

import { RedisService } from './redis.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],

      useFactory: (config: ConfigService) => {
        return { store: redisStore, ...config.get('redisDbs.authDb') };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
