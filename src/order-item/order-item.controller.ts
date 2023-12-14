import { Body, Controller, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('/add')
  async addToOrder(@Body() orderItemDto: CreateOrderItemDto) {
    return await this.orderItemService.addToOrder(orderItemDto);
  }
}
