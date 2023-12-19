import { Injectable } from "@nestjs/common";
import { Order, OrderItem, Product, User } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class OrderItemsRepo {
  constructor(private prismaService: PrismaService) {}

  async createOrderItem(orderItem: Pick<OrderItem, 'productId' | 'quantity'>) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: orderItem.productId
      }
    })
    const bundlePrice = product.price*orderItem.quantity;
    return await this.prismaService.orderItem.create({
      data: {
        product: {
          connect: { id: product.id }
        },
        quantity: Number(orderItem.quantity),
        bundlePrice
      }
    })
  }

  async findOrderItem(orderId: string, productId: string) {
    return await this.prismaService.orderItem.findFirst({
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
    return await this.prismaService.orderItem.update({
      where: {
        id: orderItem.id
      },
      data: {
        quantity: Number(newItem.quantity),
        bundlePrice: product.price*Number(newItem.quantity)
      }
    })
  }
}