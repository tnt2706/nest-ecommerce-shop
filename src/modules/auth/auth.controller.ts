import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/shop/login')
  async loginShop(@Body() loginDto: LoginDto) {
    return await this.authService.loginShop(loginDto);
  }
}
