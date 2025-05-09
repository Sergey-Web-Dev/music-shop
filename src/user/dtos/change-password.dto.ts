import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequestDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  repeatOldPassword: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  newPassword: string;
}