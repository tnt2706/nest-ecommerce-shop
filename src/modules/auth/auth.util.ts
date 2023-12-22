import { JwtService } from '@nestjs/jwt';
import { Token } from './interfaces/Token.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUtils {
  constructor(private jwtService: JwtService) {}
  async createPairToken(
    payload: object,
    publicKey: string,
    privateKey: string,
  ): Promise<Token> {
    try {
      const tokens = await Promise.all([
        this.jwtService.signAsync(payload, {
          privateKey: publicKey,
          expiresIn: '2 days',
        }),
        this.jwtService.signAsync(payload, {
          privateKey,
          expiresIn: '7 days',
        }),
      ]);

      const [accessToken, refreshToken] = tokens;

      return { accessToken, refreshToken };
    } catch (error) {
      console.error('createPairToken :: ERROR', error.message);
    }
  }
}
