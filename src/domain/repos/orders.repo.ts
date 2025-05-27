import {Injectable} from '@nestjs/common';
import {Order, OrderItem, User} from '@prisma/client';
import {DbService} from '../../db/db.service';

@Injectable()
export class OrdersRepo {
  constructor(private prismaService: DbService) {}

  async createCart(user: Pick<User, 'id'>) {
    return this.prismaService.order.create({
      data: {
        total: 0,
        status: 'InCart',
        user: {
          connect: {id: user.id},
        },
      },
    });
  }

  async findOrderById(orderId: string) {
    return this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  async findCart(user?: Pick<User, 'id'>): Promise<Order> {
    const order = await this.prismaService.order.findFirst({
      where: {
        userId: user?.id,
        status: 'InCart',
      },
      include: {
        orderItems: {
          orderBy: {
            id: 'desc',
          },
          include: {
            product: true,
          },
        },
      },
    });

    if (order) {
      order.total = order.orderItems.reduce((acc, item) => {
        return acc + item.quantity * (item.product?.price || 0);
      }, 0);
    }

    return order;
  }

  async addToOrder(order: Pick<Order, 'id'>, orderItem: OrderItem) {
    return this.prismaService.order.update({
      where: {
        id: order.id,
      },
      data: {
        orderItems: {
          connect: {id: orderItem.id},
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async updatedOrderTotal(orderId: string) {
    const aggregation = await this.prismaService.orderItem.aggregate({
      _sum: {
        price: true,
      },
      where: {
        orderId,
      },
    });
    return this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        total: aggregation._sum.price,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async removeFromOrder(
    order: Pick<Order, 'id'>,
    orderItem: Pick<OrderItem, 'id'>,
  ) {
    const res = await this.prismaService.order.update({
      where: {
        id: order.id,
      },
      data: {
        orderItems: {
          deleteMany: [{id: orderItem.id}],
        },
      },
      include: {
        orderItems: true,
      },
    });
    return res;
  }

  async clearOrder(order: Pick<Order, 'id'>) {
    return this.prismaService.order.delete({
      where: {
        id: order.id,
      },
    });
  }

  async getHistory(user: Pick<User, 'id'>) {
    return this.prismaService.order.findMany({
      where: {
        userId: user.id,
        status: 'Fulfilled',
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async submitOrder(order: Pick<Order, 'id'>) {
    return this.prismaService.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'Fulfilled',
      },
      include: {
        orderItems: true,
      },
    });
  }
}
