import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { AccessService } from './access.service';
import { CreateShopDto, UpdateShopDto, FilterShopDto } from './dto';

@Controller('shop')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}
  @Post('/signup')
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.accessService.create(createShopDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Get()
  findAll(@Query() query: FilterShopDto) {
    return this.accessService.findAll(query);
  }
}
