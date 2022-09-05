import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './entities/student.entity';
const mongoose = require('mongoose');
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  findAll() {
    return this.studentModel.find().populate('exam');
  }

  findOne(id: string) {
    return this.studentModel.findById(id).populate('exam');
  }

  update(_id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.updateOne({ _id }, updateStudentDto);
  }

  remove(_id: string) {
    return this.studentModel.remove({ _id });
  }

  assignExam(studentId, examId) {
    return this.studentModel.updateOne(
      { _id: studentId },
      { $push: { exam: examId } },
    );
  }
}
