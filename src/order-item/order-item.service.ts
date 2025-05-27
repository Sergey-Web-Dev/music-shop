import { Injectable } from '@nestjs/common';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import {orderItemBodyDto} from './dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private orderItemsRepo: OrderItemsRepo) {}

  async addToCart(orderItem: orderItemBodyDto) {
    return this.orderItemsRepo.addToCart(orderItem)
  }

  async addOrderItemProduct(orderItemId: string) {
    return this.orderItemsRepo.addOrderItemProduct(orderItemId)
  }

  async removeOrderItemProduct(orderItemId: string) {
    return this.orderItemsRepo.removeOrderItemProduct(orderItemId)
  }

  async removeFromCart(orderItemId: string) {
    return this.orderItemsRepo.removeFromCart(orderItemId)
  }
}
