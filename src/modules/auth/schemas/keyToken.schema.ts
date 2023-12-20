import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type KeyDocument = HydratedDocument<Key>;

@Schema()
export class Key {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  publicKey: string;

  @Prop({ required: true, unique: true })
  privateKey: string;

  @Prop({ default: false })
  refreshTokenUsed: string;

  @Prop({ default: [] })
  refreshToken: string[];
}

export const KeySchema = SchemaFactory.createForClass(Key);
