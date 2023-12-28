import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Key } from './key-token.model';

@Injectable()
export class KeyTokenRepository {
  constructor(@InjectModel('Key') private keyModel: Model<Key>) {}

  async getByUserId(userId: string): Promise<Key> {
    const keyStore = await this.keyModel.findOne({ user: userId }).lean();
    return keyStore;
  }
}
