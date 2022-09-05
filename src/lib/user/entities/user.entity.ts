import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/lib/role/role.enum';

export type UserDocument = User & Document;
export type IRole = {
  Teacher: 'teacher';
  Administrator: 'administrator';
};
@Schema()
export class User {
  @Prop()
  id: number;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: Role })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
