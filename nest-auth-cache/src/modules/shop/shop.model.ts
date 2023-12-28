import { Schema, Document } from 'mongoose';

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      require: true,
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },

    roles: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export { ShopSchema };

export interface Shop extends Document {
  name: string;
  email: string;
  password: string;
  status: string;
  roles: [string];
}
