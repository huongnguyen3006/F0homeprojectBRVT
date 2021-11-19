import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateF0Dto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
