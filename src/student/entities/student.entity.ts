import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Exam } from 'src/exam/entities/exam.entity';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exam: Exam[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
