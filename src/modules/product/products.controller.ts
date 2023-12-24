import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @Post('/create')
  async create(@Body() createProductDto: any): Promise<ProductDto> {
    return this.productService.create(createProductDto);
  }
}
