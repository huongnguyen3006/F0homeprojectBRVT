import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/common/decorators/admin.decorator';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';

@ApiTags('exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Admin()
  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.examService.findOne(id);
  }
}
