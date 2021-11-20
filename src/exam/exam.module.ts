import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamService],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExamModule {}
