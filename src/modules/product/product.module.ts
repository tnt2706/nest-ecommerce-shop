import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import ProductService from './product.service';
import { ProductSchema, ClothingSchema, ElectronicSchema } from './models';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Clothing', schema: ClothingSchema },
      { name: 'Electronic', schema: ElectronicSchema },
      { name: 'Product', schema: ProductSchema },
    ]),

    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
