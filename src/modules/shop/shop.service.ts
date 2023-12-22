import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Shop } from './shop.schema';
import { CreateShopDto, ShopDto } from './shop.dto';

import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
  ) {}

  async create(createShop: CreateShopDto): Promise<ShopDto> {
    const { email, password } = createShop;
    const holderShop = await this.shopRepository.findByUserEmail(email);
    if (holderShop) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const shop = await this.shopModel.create({
      ...createShop,
      password: hashedPassword,
    });

    return null;

    // return ShopDto.plainToClass(shop);
  }
}
