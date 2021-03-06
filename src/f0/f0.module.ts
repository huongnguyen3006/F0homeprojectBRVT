import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ExamModule } from 'src/exam/exam.module';
import { TestResultModule } from 'src/test-result/test-result.module';
import { UserModule } from 'src/user/user.module';
import { F0Controller } from './f0.controller';
import { F0 } from './f0.entity';
import { F0Service } from './f0.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([F0]),
    UserModule,
    TestResultModule,
    ExamModule,
  ],
  providers: [F0Service],
  controllers: [F0Controller],
  exports: [F0Service],
})
export class F0Module {}
