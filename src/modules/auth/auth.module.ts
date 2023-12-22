import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ShopModule } from '../shop/shop.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthUtils } from './auth.util';

@Module({
  imports: [ShopModule, JwtModule.register({ global: true })],
  providers: [AuthService, AuthUtils],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
