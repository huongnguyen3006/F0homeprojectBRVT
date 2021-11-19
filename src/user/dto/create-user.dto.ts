import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

enum ValidationErrorMessage {
  InvalidEmailFormat = 'Invalid email format!',
  InvalidPasswordLength = 'Password must be between 6 and 100 letters!',
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail(
    {
      ignore_max_length: true,
    },
    {
      message: ValidationErrorMessage.InvalidEmailFormat,
    },
  )
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 100, {
    message: ValidationErrorMessage.InvalidPasswordLength,
  })
  password: string;
}
