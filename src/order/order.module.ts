import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { SecurityModule } from 'libs/security/security.module';
import { JwtStrategy } from 'libs/security/strategies/jwt.strategy';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import { ProductsRepo } from 'domain/repos/products.repo';
import {DbModule} from '../db/db.module';

@Module({
  imports: [SecurityModule,DbModule],
  controllers: [OrderController],
  providers: [OrderService, OrdersRepo, OrderItemsRepo, ProductsRepo, JwtStrategy],
})
export class OrderModule {}
