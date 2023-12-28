import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Key } from './key-token.model';

@Injectable()
export class KeyTokenRepository {
  constructor(@InjectModel('Key') private keyModel: Model<Key>) {}
}
