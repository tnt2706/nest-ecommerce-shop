import { Schema, Document } from 'mongoose';

const KeySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Shop', require: true },

    publicKey: { type: String, require: true },
    privateKey: { type: String, require: true },

    refreshTokenUsed: { type: [String], default: [] },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

export { KeySchema };

export interface Key extends Document {
  user: string;
  publicKey: string;
  privateKey: string;
  refreshTokenUsed: string;
  refreshToken: [string];
}
