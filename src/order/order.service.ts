import { Injectable } from '@nestjs/common';
import { OrdersRepo } from 'domain/repos/orders.repo';
import { OrderItem, User } from '@prisma/client';
import { OrderItemsRepo } from 'domain/repos/order-items.repo';
import { ProductsRepo } from 'domain/repos/products.repo';
import { OrderDto } from 'domain/dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepo: OrdersRepo,
    private orderItemsRepo: OrderItemsRepo,
    private productsRepo: ProductsRepo,
  ) {}

  async addToOrder(
    user: Pick<User, 'id'>,
    orderItem: Pick<OrderItem, 'productId' | 'quantity'>,
  ) {
    let cart = await this.ordersRepo.findCart(user);
    if (!cart) {
      cart = await this.ordersRepo.createCart(user);
    }
    let newOrderItem = await this.orderItemsRepo.findOrderItem(
      cart.id,
      orderItem.productId,
    );
    if (!newOrderItem) {
      newOrderItem = await this.orderItemsRepo.createOrderItem(orderItem);
    } else {
      newOrderItem = await this.orderItemsRepo.updateOrderItemQuantity(
        newOrderItem,
        orderItem,
      );
    }
    const order = await this.ordersRepo.addToOrder(cart, newOrderItem);
    return await this.ordersRepo.updatedOrderTotal(order.id);
  }

  async removeFromOrder(user: Pick<User, 'id'>, orderItem: Pick<OrderItem, 'id'>) {
    const cart = await this.ordersRepo.findCart(user);
    if (!cart) {
      return;
    }
    await this.ordersRepo.removeFromOrder(cart, orderItem);
    return await this.ordersRepo.updatedOrderTotal(cart.id);
  }

  async clearOrder(user: Pick<User, 'id'>) {
    const cart = await this.ordersRepo.findCart(user);
    if (!cart) {
      return;
    }
    return await this.ordersRepo.clearOrder(cart);
  }

  async getHistory(user: Pick<User, 'id'>) {
    return await this.ordersRepo.getHistory(user);
  }

  async submitOrder(user: Pick<User, 'id'>) {
    const cart = await this.ordersRepo.findCart(user);
    if (!cart) {
      return;
    }
    const orderItems: OrderItem[] = cart['orderItems'];
    await Promise.all(orderItems.map(async (item) => {
      let availableQuantity = await this.productsRepo.getProductQuantity(item.productId);
      if (item.quantity > availableQuantity) {
        item.available = availableQuantity;
      }
      return item;
    }));
    if(orderItems.every((item) => item.available === null && item.quantity > 0)) {
      orderItems.forEach((item) => [
        this.productsRepo.updateProductAmount(item.productId, item.quantity)
      ])
      return await this.ordersRepo.submitOrder(cart);
    }
    cart['orderItems'] = orderItems;
    await this.clearOrder(user);
    return cart;
  }
}
