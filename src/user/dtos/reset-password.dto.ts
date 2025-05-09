import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  repeatPassword: string;
}