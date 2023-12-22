import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Shop } from './shop.schema';

@Injectable()
export class ShopRepository {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  async findByUserEmail(email: string) {
    const foundShop = this.shopModel.findOne({ email: email }).lean();
    return foundShop ? foundShop : null;
  }

  async findById(id: string) {
    const foundShop = this.shopModel.findById(id).lean();
    return foundShop ? foundShop : null;
  }
}
