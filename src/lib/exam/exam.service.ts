import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam, ExamDocument } from './entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<ExamDocument>) {}
  create(createExamDto: CreateExamDto) {
    const createdExam = new this.examModel(createExamDto);
    return createdExam.save();
  }

  findAll() {
    return this.examModel.find();
  }

  findOne(id: string) {
    return this.examModel.findById(id);
  }

  remove(_id: string) {
    return this.examModel.remove({ _id });
  }
}
