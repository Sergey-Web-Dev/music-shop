import { ApiProperty } from '@nestjs/swagger';

export class orderItemBodyDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  price: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  productName: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  productDescription: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  discount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  tax: number;

}