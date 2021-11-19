import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestResultService } from './test-result.service';

@ApiTags('test-results')
@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  // @Post()
  // create(@Body() createTestResultDto: CreateTestResultDto) {
  //   return this.testResultService.create(createTestResultDto);
  // }

  @Get()
  findAll() {
    return this.testResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testResultService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateTestResultDto: UpdateTestResultDto,
  // ) {
  //   return this.testResultService.update(id, updateTestResultDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.testResultService.remove(id);
  // }
}
