import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ElectronicDocument = HydratedDocument<Electronic>;

@Schema({ timestamps: true, collection: 'electronics' })
export class Electronic {
  @Prop({ required: true })
  manufacture: string;

  @Prop({ required: true, unique: true })
  size: string;

  @Prop({ required: true })
  material: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  product_shop: mongoose.Schema.Types.ObjectId;
}

export const ElectronicSchema = SchemaFactory.createForClass(Electronic);
