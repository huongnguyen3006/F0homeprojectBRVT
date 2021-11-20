import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateExamDto } from 'src/exam/dto/create-exam.dto';
import { CreateTestResultDto } from 'src/test-result/dto/create-test-result.dto';
import { CreateF0Dto } from './dto/create-f0.dto';
import { F0Service } from './f0.service';

@ApiTags('f0')
@Controller('f0s')
export class F0Controller {
  constructor(private readonly f0Service: F0Service) {}

  @Get()
  findAll() {
    return this.f0Service.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.f0Service.findOne(id);
  }

  @Post(':id/exams')
  addExam(@Param('id') id: number, @Body() createExamDto: CreateExamDto) {
    return this.f0Service.addExam(id, createExamDto);
  }

  @Post(':id/test-results')
  addTestResult(
    @Param('id') id: number,
    @Body() createTestResultDto: CreateTestResultDto,
  ) {
    return this.f0Service.addTestResult(id, createTestResultDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateF0Dto: UpdateF0Dto) {
  //   return this.f0Service.update(id, updateF0Dto);
  // }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.f0Service.delete(id);
  }
}
