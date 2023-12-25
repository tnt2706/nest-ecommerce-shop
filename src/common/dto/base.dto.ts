import { Expose, plainToClass } from 'class-transformer';
import { Schema } from 'mongoose';

export class BaseDto {
  @Expose()
  _id: Schema.Types.ObjectId;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static plainToClass<T>(this: new (...args: any[]) => any, object: T): T {
    return plainToClass(this, object, { excludeExtraneousValues: true });
  }
}
