import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProductDto: any): Promise<ProductDto> {
    return this.productService.create(createProductDto);
  }
}
