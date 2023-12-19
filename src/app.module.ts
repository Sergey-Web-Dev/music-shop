import { Module } from '@nestjs/common';
import { AuthModule } from 'auth/auth.module';
import { ProductModule } from 'product/product.module';
import { UserModule } from 'user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from 'order/order.module';


@Module({
  imports: [AuthModule, UserModule, ProductModule, PrismaModule, OrderItemModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
