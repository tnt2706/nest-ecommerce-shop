import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'inactive', enum: ['active', 'inactive'] })
  status: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  verify: boolean;

  @Prop({ default: [] })
  roles: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
