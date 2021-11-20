import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateVolunteerDto extends CreateUserDto {
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
}
