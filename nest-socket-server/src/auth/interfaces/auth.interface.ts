export interface VerifyTokenRequest {
  id: string;
  token: string;
}

export interface AuthCacheServerInterface {
  verifyToken(request: VerifyTokenRequest): Promise<any>;
}
