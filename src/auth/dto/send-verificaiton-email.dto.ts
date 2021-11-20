import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendVerificationEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
