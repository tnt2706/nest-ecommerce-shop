import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Key } from '../schemas/keyToken.schema';
import { CreateKeyTokenDto } from '../dto/keyToken.dto';

@Injectable()
export class KeyTokenRepository {
  constructor(@InjectModel(Key.name) private keyModel: Model<Key>) {}

  async create(createKeyTokenDto: CreateKeyTokenDto): Promise<Key> {
    const { user, publicKey, privateKey, refreshToken } = createKeyTokenDto;
    const token = await this.keyModel
      .findOneAndUpdate(
        { user },
        { publicKey, privateKey, refreshToken, refreshTokenUsed: [] },
        { upsert: true, new: true },
      )
      .lean();

    return token;
  }

  async updateRefreshToken(
    refreshToken: string,
    oldRefreshToken: string,
  ): Promise<void> {
    await this.keyModel
      .updateOne(
        { refreshToken: oldRefreshToken },
        {
          $set: { refreshToken },
          $addToSet: { refreshTokenUsed: oldRefreshToken },
        },
        { new: true, upsert: true },
      )
      .lean();
  }

  async getByUserId(userId: string): Promise<Key> {
    const keyStore = await this.keyModel.findOne({ user: userId }).lean();
    return keyStore;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.keyModel.deleteOne({ user: userId });
  }
}
