import { Injectable } from "@nestjs/common";
import { OrderItem, } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { DbService } from '../../db/db.service';
import {orderItemBodyDto} from '../../order-item/dtos/order-item.dto';


@Injectable()
export class OrderItemsRepo {
  constructor(private prismaService: DbService) {}

  async createOrderItem(orderItem: Pick<OrderItem, 'productId' | 'quantity'>) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: orderItem.productId
      }
    })
    const price = product.price*orderItem.quantity;
    return this.prismaService.orderItem.create({
      data: {
        product: {
          connect: { id: product.id }
        },
        quantity: Number(orderItem.quantity),
        price
      }
    })
  }

  async findOrderItem(orderId: string, productId: string) {
    return  this.prismaService.orderItem.findFirst({
      where: {
        orderId,
        productId
      }
    })
  }

  async addToCart(orderItem: orderItemBodyDto) {
    return  this.prismaService.orderItem.create({
      data: {
        ...orderItem
      }
    })
  }

  async addOrderItemProduct(orderItemId: string) {
    // const product = await this.prismaService.product.findUnique({
    //   where: {
    //     id: orderItem.productId
    //   }
    // })
    return  this.prismaService.orderItem.update({
      where: {
        id: orderItemId
      },
      data: {
        quantity: {
          increment: 1,
        },
      }
    })
  }

  async removeOrderItemProduct(orderItemId: string) {
    // const product = await this.prismaService.product.findUnique({
    //   where: {
    //     id: orderItem.productId
    //   }
    // })
    return  this.prismaService.orderItem.update({
      where: {
        id: orderItemId
      },
      data: {
        quantity: {
          decrement: 1,
        },
      }
    })
  }

  async removeFromCart(orderItemId: string) {
    return  this.prismaService.orderItem.delete({
      where: {
        id: orderItemId
      },
    })
  }
}