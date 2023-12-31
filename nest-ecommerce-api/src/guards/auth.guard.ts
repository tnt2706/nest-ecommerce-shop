import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as _ from 'lodash';

import { JwtService } from '@nestjs/jwt';
import { KeyTokenRepository } from '../modules/auth/repositories/key.repository';
import { Reflector } from '@nestjs/core';
import { Auth } from '../enums/auth.enum';
import { AUTH_KEY } from '../decorators/auth.decorator';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'x-rtoken-id',
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly keyTokenRepo: KeyTokenRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authMetaData = this.reflector.getAllAndOverride<Auth[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (authMetaData?.includes(Auth.Skip)) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
      throw new UnauthorizedException('Required x-client-id in header');
    }

    const keyStore = await this.keyTokenRepo.getByUserId(userId);
    if (!keyStore) {
      throw new NotFoundException('Not found key store');
    }

    const { publicKey, privateKey } = keyStore;

    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    if (refreshToken) {
      const decodeUser = await this.jwtService.verifyAsync(refreshToken, {
        publicKey: privateKey,
      });

      if (decodeUser.userId !== userId) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      req.keyStore = keyStore;
      req.refreshToken = refreshToken;
      req.user = _.pick(decodeUser, ['userId', 'email', 'roles', 'name']);

      return true;
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];

    const decodeUser = await this.jwtService.verifyAsync(accessToken, {
      publicKey,
    });

    if (decodeUser.userId !== userId) {
      throw new UnauthorizedException('Invalid access token');
    }

    req.keyStore = keyStore;
    req.user = decodeUser;
    return true;
  }
}
