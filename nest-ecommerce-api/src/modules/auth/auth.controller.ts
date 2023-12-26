import { Request } from 'express';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { LoginDto } from './dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout(req);
  }

  @UseGuards(AuthGuard)
  @Post('/handlerRefresherToken')
  async handlerRefresherToken(@Req() req: Request) {
    return await this.authService.handlerRefresherToken(req);
  }
}
