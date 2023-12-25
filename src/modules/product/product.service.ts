import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, Electronic, Clothing } from './schemas';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Clothing.name) private clothingModel: Model<Clothing>,
    @InjectModel(Electronic.name) private electronicModel: Model<Electronic>,
  ) {}

  async create(createProductDto: any): Promise<ProductDto> {
    console.log(createProductDto);
    return null;
  }
}
