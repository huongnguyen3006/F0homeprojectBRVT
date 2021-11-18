import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

enum ValidationErrorMessage {
  InvalidEmailFormat = 'Invalid email format!',
  InvalidFirstNameLength = 'First name must be between 1 and 255 letters!',
  InvalidLastNameLength = 'Last name must be between 1 and 255 letters!',
  InvalidUsernameLength = 'Username must be between 6 and 16 letters!',
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

  @ApiProperty()
  @IsString()
  @Length(1, 255, {
    message: ValidationErrorMessage.InvalidFirstNameLength,
  })
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255, {
    message: ValidationErrorMessage.InvalidLastNameLength,
  })
  lastName: string;
}
