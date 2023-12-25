import { Schema, Document } from 'mongoose';
import { Shop } from 'src/modules/shop/shop.model';

const ElectronicSchema = new Schema(
  {
    manufacture: { type: String, require: true },
    size: { type: String, require: true },
    material: { type: String, require: true },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    timestamps: true,
  },
);
export { ElectronicSchema };

export interface Electronic extends Document {
  manufacture: string;
  size: string;
  material: string;
  product_shop: Shop;
}
