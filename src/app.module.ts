import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AccessModule } from './modules/access/access.module';
import { CommonModule } from './common/common.module';
import { ConfigureModule } from './config/config.module';
import { DatabaseModule } from './dbs/database.module';

@Module({
  imports: [AccessModule, CommonModule, ConfigureModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
