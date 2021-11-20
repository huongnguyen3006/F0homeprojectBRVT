import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

enum ValidationErrorMessage {
  InvalidEmailFormat = 'Invalid email format!',
  InvalidPasswordLength = 'Password must be between 6 and 100 letters!',
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail(
    {},
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
