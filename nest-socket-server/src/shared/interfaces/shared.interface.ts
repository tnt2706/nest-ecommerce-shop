export interface VerifyTokenRequest {
  id: string;
  token: string;
}

export interface VerifyTokenInterface {
  VerifyToken(data: VerifyTokenRequest): Promise<any>;
}
