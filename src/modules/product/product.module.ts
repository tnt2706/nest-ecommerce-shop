import slugify from 'slugify';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import ProductService from './product.service';

import ProductSchema, { Product } from './schemas/product.schema';
import { Clothing, ClothingSchema } from './schemas/clothing.schema';
import { Electronic, ElectronicSchema } from './schemas/electronic.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
      { name: Electronic.name, schema: ElectronicSchema },
    ]),

    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.pre('save', function () {
            this.product_slug = slugify(this.product_name, { lower: true });
          });

          return schema;
        },
      },
    ]),

    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
