import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema, { Product } from './schemas/product.schema';
import { Clothing, ClothingSchema } from './schemas/clothing.schema';
import { Electronic, ElectronicSchema } from './schemas/electronic.schema';
import { KeyTokenRepository } from '../auth/repositories/key.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Clothing.name, schema: ClothingSchema },
      { name: Electronic.name, schema: ElectronicSchema },
    ]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}