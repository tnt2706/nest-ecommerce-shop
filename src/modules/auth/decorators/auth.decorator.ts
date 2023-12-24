import { SetMetadata } from '@nestjs/common';
import { Auth } from '../enums/auth.enum';

export const AUTH_KEY = 'auth';
export const Authorizations = (...auth: Auth[]) => SetMetadata(AUTH_KEY, auth);
