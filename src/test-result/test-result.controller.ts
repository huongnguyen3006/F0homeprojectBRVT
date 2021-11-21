import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestResultService } from './test-result.service';

@ApiTags('test-results')
@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Get()
  findAll() {
    return this.testResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testResultService.findOne(id);
  }
}
