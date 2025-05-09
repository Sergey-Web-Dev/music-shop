import { IsEmail, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class SignUpBodyDto {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '1234556678',
  })

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string
}