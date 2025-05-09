import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {orderItemBodyDto} from '../../order-item/dtos/order-item.dto';

export class UserInfoResponseDto {

  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    enum: [
      $Enums.UserRole.ADMIN,
      $Enums.UserRole.CUSTOMER,
    ],
  })
  userRole:  $Enums.UserRole;

  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  location: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  shortBio: string;

  @ApiProperty({
    type: [orderItemBodyDto],
    required: true,
  })
  orders: orderItemBodyDto[];

}