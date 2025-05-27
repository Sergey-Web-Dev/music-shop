import { ApiProperty } from '@nestjs/swagger';

export class orderItemBodyDto {
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
  productId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  orderId: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  available: number;

}