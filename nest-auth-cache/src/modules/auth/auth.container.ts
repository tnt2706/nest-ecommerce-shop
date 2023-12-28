import * as _ from 'lodash';

import {
  BadRequestException,
  Controller,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GrpcMethod } from '@nestjs/microservices';
import { RedisService } from '../redis/redis.service';
import { ShopRepository } from '../shop/shop.repository';
import { KeyTokenRepository } from '../keytoken/key-token.repository';

@Controller()
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly shopRepo: ShopRepository,
    private readonly keyTokenRepo: KeyTokenRepository,
  ) {}

  @GrpcMethod('AuthCacheServer', 'VerifyToken')
  async VerifyToken(request: any): Promise<any> {
    const { id, token } = request;

    if (!id || !token) {
      throw new BadRequestException(' Missing request data');
    }

    const key = `user::${id}`;
    const userCache = await this.redisService.get(key);

    const { user, keyStore } = (await this.getInfoUser(id, userCache)) || {};

    if (!keyStore) {
      throw new NotFoundException('Not found key store');
    }

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    const { publicKey } = keyStore;

    const decodeUser = await this.jwtService.verifyAsync(token, {
      publicKey,
    });

    if (`${decodeUser.userId}` !== `${id}`) {
      throw new UnauthorizedException('Invalid access token');
    }

    await this.upsertCacheUser(userCache, user, keyStore);

    const signature = {
      id,
      ..._.pick(user, ['email', 'name', 'status', 'verify', 'roles']),
    };
    return { isSuccess: true, signature };
  }

  async getInfoUser(userId: string, userCache: any): Promise<any> {
    if (userCache) {
      const { keyStore, ...userInfo } = JSON.parse(userCache);
      return { user: userInfo, keyStore };
    }

    const [user, keyStore] = await Promise.all([
      this.shopRepo.findById(userId),
      this.keyTokenRepo.getByUserId(userId),
    ]);

    return { user, keyStore };
  }

  async upsertCacheUser(userCache: any, user: any, keyStore: any) {
    if (userCache) {
      return;
    }

    const key = `user::${user._id}`;
    const userInfo = {
      id: user._id,
      ..._.pick(user, ['email', 'name', 'status', 'verify', 'roles']),
      keyStore: _.pick(keyStore, ['publicKey', 'privateKey']),
    };

    const cacheUser = await this.redisService.set(
      key,
      JSON.stringify(userInfo),
    );

    return cacheUser;
  }
}
