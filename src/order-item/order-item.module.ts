import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import {DbModule} from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemsRepo],
})
export class OrderItemModule {}
