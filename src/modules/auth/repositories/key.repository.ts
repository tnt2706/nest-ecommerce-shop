import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Key } from '../schemas/keyToken.schema';

@Injectable()
export class KeyTokenRepository {
  constructor(@InjectModel(Key.name) private keyTokenModel: Model<Key>) {}

  async create(shop: Shop): Promise<Shop> {}
}
