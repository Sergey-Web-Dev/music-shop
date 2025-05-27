import {Body, Controller, Param, Patch, Post, Delete} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import {orderItemBodyDto} from './dtos/order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('add-to-cart')
  async addToCart(@Body() orderItem: orderItemBodyDto) {
    return  await this.orderItemService.addToCart(orderItem);
  }

  @Patch('add-one-product/:id')
  async addOrderItemProduct(@Param('id') orderItemId: string) {
   return  await this.orderItemService.addOrderItemProduct(orderItemId);
  }

  @Patch('remove-one-product/:id')
  async removeOrderItemProduct(@Param('id') orderItemId: string) {
    return  await this.orderItemService.removeOrderItemProduct(orderItemId);
  }

  @Delete('remove-from-cart/:id')
  async removeFromCart(@Param('id') orderItemId: string) {
    return  await this.orderItemService.removeFromCart(orderItemId);
  }
}
