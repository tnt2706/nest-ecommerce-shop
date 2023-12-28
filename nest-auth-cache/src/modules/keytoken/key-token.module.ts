import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { KeySchema } from './key-token.model';
import { KeyTokenRepository } from './key-token.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Key', schema: KeySchema }])],
  providers: [KeyTokenRepository],
  exports: [KeyTokenRepository],
})
export class KeyTokenModule {}
