import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RequestResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
