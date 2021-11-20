import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty()
  @Exclude()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
