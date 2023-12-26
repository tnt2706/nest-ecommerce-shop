import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ShopModule } from '../shop/shop.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthUtils } from './auth.util';
import { KeyTokenRepository } from './repositories/key.repository';
import { MongooseModule } from '@nestjs/mongoose';

import { Key, KeySchema } from './schemas/keyToken.schema';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
@Module({
  imports: [
    ShopModule,
    JwtModule.register({ global: true }),
    MongooseModule.forFeature([{ name: Key.name, schema: KeySchema }]),
  ],
  providers: [
    AuthService,
    AuthUtils,
    KeyTokenRepository,
    {
      provide: 'AUTH_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'ROLE_GUARD',
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, KeyTokenRepository],
})
export class AuthModule {}
