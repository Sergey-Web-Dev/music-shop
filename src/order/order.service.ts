import { Injectable } from '@nestjs/common';
import { OrdersRepo } from 'domain/repos/orders.repo';

@Injectable()
export class OrderService {
  constructor(private ordersRepo: OrdersRepo) {}

  async createOrder(userId: string) {
    return await this.ordersRepo.createOrder(userId)
  }
}
