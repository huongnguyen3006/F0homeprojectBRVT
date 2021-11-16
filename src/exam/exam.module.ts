import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamService],
  controllers: [ExamController]
})
export class ExamModule {}
