import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrdersRepo } from 'domain/repos/orders.repo';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrdersRepo],
})
export class OrderModule {}
