import { PartialType } from '@nestjs/swagger';
import { CreateTestResultDto } from './create-test-result.dto';

export class UpdateTestResultDto extends PartialType(CreateTestResultDto) {}
