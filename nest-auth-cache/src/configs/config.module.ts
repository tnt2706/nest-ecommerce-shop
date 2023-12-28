import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import database from './db.config';
import container from './container.config';
import grpc from './grpc.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, container, grpc],
      envFilePath: ['.env', '.env.production'],
    }),
  ],
})
export class ConfigsModule {}
