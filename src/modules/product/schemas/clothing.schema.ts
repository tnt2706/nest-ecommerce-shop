import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClothingDocument = HydratedDocument<Clothing>;

@Schema({ timestamps: true, collection: 'clothings' })
export class Clothing {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true, unique: true })
  size: string;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  material: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  product_shop: mongoose.Schema.Types.ObjectId;
}

export const ClothingSchema = SchemaFactory.createForClass(Clothing);
