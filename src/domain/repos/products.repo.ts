import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsRepo {
  constructor(private prismaService: PrismaService) {}

  async getProducts() {
    return await this.prismaService.product.findMany({
      where: {
        quantityAvailable: { gt: 0 },
      },
    });
  }

  async getAllProducts() {
    return await this.prismaService.product.findMany();
  }

  async getProductById(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }
}
