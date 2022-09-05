import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './entities/exam.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
