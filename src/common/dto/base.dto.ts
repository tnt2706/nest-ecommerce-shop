import { Expose, plainToClass } from 'class-transformer';
import mongoose from 'mongoose';

export class BaseDto {
  @Expose()
  _id: mongoose.Types.ObjectId;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static plainToClass<T>(this: new (...args: any[]) => T, object: T): T {
    return plainToClass(this, object, { excludeExtraneousValues: true });
  }
}
