import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Roles(Role.Administrator)
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Roles(Role.Administrator)
  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Roles(Role.Administrator)
  @Get(':examId')
  findOne(@Param('examId') id: string) {
    return this.examService.findOne(id);
  }

  @Roles(Role.Administrator)
  @Delete(':examId')
  delete(@Param('examId') id: string) {
    return this.examService.remove(id);
  }
}
