import {
  BadRequestException,
  Injectable,
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
    const { email, password } = loginDto;
    const holderShop = await this.shopRepository.findByUserEmail(email);
    if (!holderShop) {
      throw new BadRequestException('Email not found');
    }
    const { password: hashPassword } = holderShop;
    const isMatch = await bcrypt.compare(password, hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = _.pick(holderShop, ['_id', 'name', 'email', 'roles']);

    const publicKey = randomBytes(64).toString('hex');
    const privateKey = randomBytes(64).toString('hex');

    const token = await this.authUtils.createPairToken(
      payload,
      publicKey.toString(),
      privateKey.toString(),
    );

    this.keyTokenRepo.create();

    return token;
  }

  async logout(userId: string) {}

  async handlerRefresherToken(userId: string) {}
}
