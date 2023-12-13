import { Injectable } from '@nestjs/common';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import { CreateOrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private orderItemsRepo: OrderItemsRepo) {}

  async addToOrder(orderItemDto: CreateOrderItemDto) {
    return await this.orderItemsRepo.createOrderItem(orderItemDto);
  }
}
