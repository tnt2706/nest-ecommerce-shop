import slugify from 'slugify';
import { Schema, Document } from 'mongoose';
import { Shop } from '../../shop/shop.model';

const ProductSchema = new Schema(
  {
    product_name: { type: String, require: true },
    product_thumb: { type: String, require: true },
    product_slug: { type: String, require: true },
    product_description: { type: String, require: true },
    product_price: { type: Number, require: true },
    product_quantity: { type: Number, require: true },
    product_type: {
      type: String,
      require: true,
      enum: ['Electronics', 'Clothing', 'Furniture'],
    },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, require: true },
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    product_variations: { type: Array, default: [] },

    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    timestamps: true,
  },
);

// Create index for search
ProductSchema.index({ product_name: 'text', product_description: 'text' });

// Document middleware: run before .save() and .create ...
ProductSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

export { ProductSchema };

export interface Product extends Document {
  product_name: string;
  product_thumb: string;
  product_slug: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_type: string;
  product_shop: Shop;
  product_attributes: any;
  product_ratingAverage: number;
  product_variations: any[];
  isDraft: boolean;
  isPublished: boolean;
}
