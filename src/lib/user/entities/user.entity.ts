import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export type IRole = {
  Teacher: 'teacher';
  Administrator: 'administrator';
};
@Schema()
export class User {
  @Prop()
  id: number;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: ['teacher', 'administrator'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
