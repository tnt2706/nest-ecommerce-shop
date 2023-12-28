import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  VerifyTokenRequest,
  AuthCacheServerInterface,
} from './interfaces/auth.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private gRpcService: AuthCacheServerInterface;

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    // With `SocketioServer` in name of service in file .proto
    this.gRpcService =
      this.client.getService<AuthCacheServerInterface>('AuthCacheServer');
  }

  async verifyToken(request: VerifyTokenRequest): Promise<any> {
    return this.gRpcService.verifyToken(request);
  }
}
