import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginShop(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/logout')
  async loginShop(@Body() logoutDto: any) {
    return await this.authService.logout(loginDto);
  }

  @Post('/handlerRefresherToken')
  async handlerRefresherToken(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
