import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  VerifyTokenRequest,
  VerifyTokenInterface,
} from './interfaces/shared.interface';

@Injectable()
export class SharedService {
  private gRpcService: VerifyTokenInterface;

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    // With `AuthCacheServer` in name of service in file .proto
    this.gRpcService =
      this.client.getService<VerifyTokenInterface>('AuthCacheServer');
  }

  async verifyToken(request: VerifyTokenRequest): Promise<any> {
    return this.gRpcService.VerifyToken(request);
  }
}
