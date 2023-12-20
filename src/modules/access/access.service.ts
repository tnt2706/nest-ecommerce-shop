import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Shop } from './schemas/shop.schema';
import { CreateShopDto } from './dto';

import { ShopRepository } from './schemas/repositories/shop.repo';

@Injectable()
export class AccessService {
  constructor(
    private readonly shopRepository: ShopRepository,
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
  ) {}

  async create(createShop: CreateShopDto) {
    const { email, password } = createShop;
    const shop = await this.shopRepository.findByUserEmail(email);
    if (shop) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    return null;
  }

  findAll(query): Shop[] {
    return [];
  }
}
