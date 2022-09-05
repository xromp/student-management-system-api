import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssignExam } from './dto/assign-exam.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Teacher)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(Role.Teacher)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':studentId')
  @Roles(Role.Teacher)
  findOne(@Param('studentId') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':studentId')
  @Roles(Role.Teacher)
  update(
    @Param('studentId') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':studentId')
  @Roles(Role.Teacher)
  remove(@Param('studentId') id: string) {
    return this.studentService.remove(id);
  }

  @Patch('assign-exam/:studentId')
  @Roles(Role.Teacher)
  assignExam(
    @Param('studentId') studentId: string,
    @Body() { examId }: AssignExam,
  ) {
    return this.studentService.assignExam(studentId, examId);
  }
}
