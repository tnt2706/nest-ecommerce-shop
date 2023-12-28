import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import container from './container.config';
import grpc from './grpc.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [container, grpc],
      envFilePath: ['.env', '.env.production'],
    }),
  ],
})
export class ConfigsModule {}
