import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { LoginDto } from './dto';
import { AuthUtils } from './auth.util';
import { ShopRepository } from '../shop/shop.repository';
import { KeyTokenRepository } from './repositories/key.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly authUtils: AuthUtils,
    private readonly keyTokenRepo: KeyTokenRepository,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const holderShop = await this.shopRepository.findByUserEmail(email);
      if (!holderShop) {
        throw new BadRequestException('Email not found');
      }
      const { _id, password: hashPassword } = holderShop;
      const isMatch = await bcrypt.compare(password, hashPassword);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = {
        ..._.pick(holderShop, ['name', 'email', 'roles']),
        userId: _id.toString(),
      };

      const publicKey = randomBytes(64).toString('hex');
      const privateKey = randomBytes(64).toString('hex');

      const token = await this.authUtils.createPairToken(
        payload,
        publicKey.toString(),
        privateKey.toString(),
      );

      this.keyTokenRepo.create({
        user: _id.toString(),
        publicKey,
        privateKey,
        refreshToken: token.refreshToken,
      });

      return token;
    } catch (error) {
      return { message: error.message, status: 'error' };
    }
  }

  async logout(req: any) {
    try {
      const userId = req.user.userId;
      if (!userId) {
        throw new UnauthorizedException('Missing user in request');
      }
      await this.keyTokenRepo.deleteByUserId(userId);
      return true;
    } catch (error) {
      return { message: error.message, status: 'error' };
    }
  }

  async handlerRefresherToken(req: any) {
    try {
      const { user, keyStore, refreshToken } = req;
      const { userId } = user;
      const { refreshTokenUsed = [], privateKey, publicKey } = keyStore || {};

      if (refreshTokenUsed.includes(refreshToken)) {
        await this.keyTokenRepo.deleteByUserId(userId);
        throw new ForbiddenException(
          'Something warning happen ! Please re-login',
        );
      }

      if (keyStore.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Refresh token incorrect');
      }

      const foundShop = await this.shopRepository.findById(userId);
      if (!foundShop) {
        throw new NotFoundException('Not found shop');
      }

      const token = await this.authUtils.createPairToken(
        user,
        publicKey,
        privateKey,
      );

      this.keyTokenRepo.updateRefreshToken(token.refreshToken, refreshToken);

      return token;
    } catch (error) {
      return { message: error.message, status: 'error' };
    }
  }
}
