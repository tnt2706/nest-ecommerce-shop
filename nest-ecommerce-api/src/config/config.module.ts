import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import database from './db.config';
import aws from './aws.config';
import container from './container.config';
import cloudinary from './cloudinary.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [aws, database, container, cloudinary],
      envFilePath: ['.env.dev', '.env.production'],
    }),
  ],
})
export class ConfigsModule {}
