import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../../common/dto/base.dto';

export class ProductDto extends BaseDto {
  @Expose()
  product_name: string;

  @Expose()
  product_thumb: string;

  @Expose()
  product_slug: string;

  @Expose()
  product_description: string;

  @Expose()
  product_price: number;

  @Expose()
  product_quantity: number;

  @Expose()
  product_type: string;

  @Expose()
  product_shop: string;

  @Expose()
  product_attributes: any;

  @Expose()
  product_ratingAverage: number;

  @Expose()
  product_variations: any;
}

export class CreateProductDto {
  @IsString()
  product_name: string;

  @IsString()
  product_thumb: string;

  @IsString()
  product_slug: string;

  @IsString()
  product_description: string;

  @IsNumber()
  product_price: number;

  @IsNumber()
  product_quantity: number;

  @IsString()
  @IsNotEmpty()
  product_type: string;

  product_attributes: any;

  @IsNumber()
  product_ratingAverage: number;

  product_variations: any;
}
