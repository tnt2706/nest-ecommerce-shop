import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RedisService } from '../redis/redis.service';

@Controller()
export class AuthController {
  constructor(private readonly redisService: RedisService) {}

  @GrpcMethod('AuthCacheServer', 'VerifyToken')
  async VerifyToken(request: any): Promise<any> {
    await this.redisService.set('aa', 100, 60 * 1000);
    console.log(await this.redisService.get('aa'));
    return { isSuccess: true };
  }
}
