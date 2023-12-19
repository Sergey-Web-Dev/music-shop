import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';

@Injectable()
export class OrderItemService {
  constructor(private orderItemsRepo: OrderItemsRepo) {}

  async updateOrderItemQuantity(orderItem: Pick<OrderItem, 'id' | 'productId'>, newOrderItem: Pick<OrderItem, 'quantity'>) {
    return this.orderItemsRepo.updateOrderItemQuantity(orderItem, newOrderItem)
  }
}
