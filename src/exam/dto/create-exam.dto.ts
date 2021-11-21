import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { F0 } from 'src/f0/f0.entity';

export class CreateExamDto {
  @ApiProperty()
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @IsNumber()
  spo2: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  dot: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  symptoms: string;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  prescription: string;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  f0: F0;
}
