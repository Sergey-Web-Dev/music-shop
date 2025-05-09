import { Injectable } from "@nestjs/common";
import { OrderItem, } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { DbService } from '../../db/db.service';


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

  async updateOrderItemQuantity(orderItem: Pick<OrderItem, 'id' | 'productId'>, newItem: Pick<OrderItem, 'quantity'>) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: orderItem.productId
      }
    })
    return  this.prismaService.orderItem.update({
      where: {
        id: orderItem.id
      },
      data: {
        quantity: Number(newItem.quantity),
        price: product.price*Number(newItem.quantity)
      }
    })
  }
}