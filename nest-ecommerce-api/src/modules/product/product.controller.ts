import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import ProductService from './product.service';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @Post('/create')
  async create(
    @Req() req: Request,
    @Body() createProductDto: Partial<CreateProductDto>,
  ): Promise<ProductDto> {
    return this.productService.create(req, createProductDto);
  }
}
