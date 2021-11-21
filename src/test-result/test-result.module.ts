import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult])],
  controllers: [TestResultController],
  providers: [TestResultService],
  exports: [TestResultService],
})
export class TestResultModule {}
