import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserListRequestDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  direction: 'ASC' | 'DESC';
}