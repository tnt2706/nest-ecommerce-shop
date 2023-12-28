import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsModule } from './sockets/sockets.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { SocketGateway } from './ws.gateway';
import { ConfigsModule } from './configs/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigsModule, SocketsModule, HealthcheckModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
