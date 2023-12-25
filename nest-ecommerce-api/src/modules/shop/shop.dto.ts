import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from 'ecommerce-api/src/common/dto/base.dto';

export class ShopDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  status: string;

  @Expose()
  roles: string[];

  @Exclude()
  password: string;
}

export class CreateShopDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
