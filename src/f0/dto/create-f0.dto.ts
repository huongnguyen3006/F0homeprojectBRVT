import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Volunteer } from 'src/volunteer/volunteer.entity';

export class CreateF0Dto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  age: number;

  @ApiProperty()
  @IsString()
  @MaxLength(500)
  address: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(500)
  avatar?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  dop: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  don: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  symptoms: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(500)
  note: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  treatment: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  volunteer: Volunteer;
}
