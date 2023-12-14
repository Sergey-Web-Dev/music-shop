import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class OrdersRepo {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: string) {
    return await this.prismaService.order.create({
      data: {
        total: 0,
        status: 'InCart',
        user: {
          connect: { id: userId }
        }
      }
    })
  }
}