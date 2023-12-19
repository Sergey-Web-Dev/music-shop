import { Body, Controller, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { JwtGuard } from 'libs/security/guards/jwt.guard';
import { OrderItem } from '@prisma/client';
import { OrderItemDto } from 'domain/dto/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('update-quantity')
  @UseGuards(JwtGuard)
  async updateOrderItemQuantity(@Body() orderItem: Pick<OrderItem, 'id' | 'productId' | 'quantity'>) {
    const item = await this.orderItemService.updateOrderItemQuantity(orderItem, orderItem);
    return OrderItemDto.fromEntity(item);
  }
}
