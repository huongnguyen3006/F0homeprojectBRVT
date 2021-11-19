import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { F0 } from 'src/f0/f0.entity';
import { TestType, testTypes } from '../entities/test-result.entity';

export class CreateTestResultDto {
  @ApiProperty()
  @IsIn(testTypes)
  type: TestType;

  @ApiProperty()
  @IsBoolean()
  isPositive: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  place: string;

  @ApiProperty()
  @IsNumber()
  f0: F0;
}
