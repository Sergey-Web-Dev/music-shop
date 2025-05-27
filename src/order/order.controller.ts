import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'libs/decorators/current-user.decorator';
import { OrderItem, User } from '@prisma/client';
import { JwtGuard } from 'libs/security/guards/jwt.guard';
import { OrderDto } from 'domain/dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get('cart')
  // @UseGuards(JwtGuard)
  // async getCart(@CurrentUser('id') userId: string) {
  //   const user = { id: userId };
  //   return await this.orderService.getCart(user)
  // }

  @Get('cart')
  async getCart() {
    return await this.orderService.getCart()
  }

  // @Post('add-to-order')
  // @UseGuards(JwtGuard)
  // async addToOrder(@CurrentUser('id') userId: string, @Body() orderItem: Pick<OrderItem, 'productId' | 'quantity'>) {
  //   const user = { id: userId };
  //   const order = await this.orderService.addToOrder(user, orderItem);
  //   return OrderDto.fromEntity(order);
  // }

  @Post('remove-from-order')
  @UseGuards(JwtGuard)
  async removeFromOrder(@CurrentUser('id') user: Pick<User, 'id' >, @Body() orderItem: Pick<OrderItem, 'id'>) {
    const order = await this.orderService.removeFromOrder(user, orderItem);
    return OrderDto.fromEntity(order);
  }

  @Post('clear-order')
  @UseGuards(JwtGuard)
  async clearOrder(@CurrentUser('id') user: Pick<User, 'id' >) {
    const order = await this.orderService.clearOrder(user);
    if(!order) {
      throw new HttpException('You do not have a cart', HttpStatus.BAD_REQUEST)
    }
    return OrderDto.fromEntity(order);
  }

  @Get('history')
  @UseGuards(JwtGuard)
  async getHistory(@CurrentUser('id') userId: string) {
    const user = { id: userId };
    const history = await this.orderService.getHistory(user);
    return OrderDto.fromEntities(history);
  }

  // @Post('submit')
  // @UseGuards(JwtGuard)
  // async submitOrder(@CurrentUser('id') userId: string) {
  //   const user = { id: userId };
  //   const order = await this.orderService.submitOrder(user);
  //   return OrderDto.fromEntity(order)
  // }
}
