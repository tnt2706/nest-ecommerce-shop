import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type KeyDocument = HydratedDocument<Key>;

@Schema({ timestamps: true, collection: 'keys' })
export class Key {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  publicKey: string;

  @Prop({ required: true, unique: true })
  privateKey: string;

  @Prop({ default: false })
  refreshToken: string;

  @Prop({ default: [] })
  refreshTokenUsed: string[];
}

export const KeySchema = SchemaFactory.createForClass(Key);
