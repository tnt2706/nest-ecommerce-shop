import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { ShopRepository } from '../shop/shop.repository';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async loginShop(loginDto: LoginDto) {
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

    return holderShop;
  }
}
