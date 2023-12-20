import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateShopDto {
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  roles: string[];
}
