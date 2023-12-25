import { Schema, Document } from 'mongoose';
import { Shop } from 'src/modules/shop/shop.model';

const ClothingSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: { type: String, require: true },
    material: { type: String, require: true },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    timestamps: true,
  },
);
export { ClothingSchema };

export interface Clothing extends Document {
  brand: string;
  size: string;
  material: string;
  product_shop: Shop;
}
