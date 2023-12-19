import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import { ProductsRepo } from 'domain/repos/products.repo';
import { OrdersRepo } from 'domain/repos/orders.repo';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemsRepo],
})
export class OrderItemModule {}
