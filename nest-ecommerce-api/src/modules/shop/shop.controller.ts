import { Controller, Post, Body } from '@nestjs/common';

import { ShopService } from './shop.service';
import { CreateShopDto, ShopDto } from './shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('/register')
  async create(@Body() createShopDto: CreateShopDto): Promise<ShopDto> {
    return this.shopService.create(createShopDto);
  }
}
