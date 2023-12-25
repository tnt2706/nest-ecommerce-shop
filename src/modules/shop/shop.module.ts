import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

import { Shop, ShopSchema } from './shop.schema';
import { ShopRepository } from './shop.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
  exports: [ShopRepository],
})
export class ShopModule {}
