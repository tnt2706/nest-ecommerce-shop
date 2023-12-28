import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopSchema } from './shop.model';
import { ShopRepository } from './shop.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Shop',
        schema: ShopSchema,
      },
    ]),
  ],

  providers: [ShopRepository],
  exports: [ShopRepository],
})
export class ShopModule {}
