import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

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
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
  exports: [ShopRepository],
})
export class ShopModule {}
