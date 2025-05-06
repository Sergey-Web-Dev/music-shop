import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { ProductModule } from 'product/product.module';
import { UserModule } from 'user/user.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from 'order/order.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, DbModule, OrderItemModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
