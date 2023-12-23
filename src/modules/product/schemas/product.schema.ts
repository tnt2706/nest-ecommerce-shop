import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_thumb: string;

  @Prop({ required: true })
  product_slug: string;

  @Prop({ required: true })
  product_description: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ required: true })
  product_quantity: number;

  @Prop({ required: true, enum: ['Electronics', 'Clothing'] })
  product_type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  product_shop: mongoose.Schema.Types.ObjectId;

  // Info about product examples: Electronics, Clothing
  @Prop({ required: true })
  product_attributes: mongoose.Schema.Types.Mixed;

  @Prop({
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  })
  product_ratingAverage: number;

  @Prop({ default: [] })
  product_variations: [string];

  @Prop({ default: true, index: true, select: false })
  isDraft: boolean;

  @Prop({ default: false, index: true, select: false })
  isPublished: boolean;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ product_name: 'text', product_description: 'text' });

export default ProductSchema;
