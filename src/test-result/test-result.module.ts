import { Module } from '@nestjs/common';
import { TestResultService } from './test-result.service';
import { TestResultController } from './test-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { F0Module } from 'src/f0/f0.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult]), F0Module],
  controllers: [TestResultController],
  providers: [TestResultService],
  exports: [TestResultService],
})
export class TestResultModule {}
