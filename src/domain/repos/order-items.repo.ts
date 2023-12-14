import { Injectable } from "@nestjs/common";
import { CreateOrderItemDto, OrderItemDto } from "order-item/dto/order-item.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class OrderItemsRepo {
  constructor(private prismaService: PrismaService) {}

  async createOrderItem(orderItemDto: CreateOrderItemDto): Promise<OrderItemDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: orderItemDto.productId,
      }
    })
    return await this.prismaService.orderItem.create({
      data: {
        product: {
          connect: {id: orderItemDto.productId}
        },
        quantity: Number(orderItemDto.quantity),
        bundlePrice: product.price*Number(orderItemDto.quantity),
      }
    })
  }
}