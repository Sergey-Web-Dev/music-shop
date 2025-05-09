import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordRequestDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}