import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
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

  async getProductQuantity(id: string) {
    const searchedProduct = await this.prismaService.product.findUnique({
      where: {
        id
      }
    })
    return searchedProduct.quantityAvailable
  }

  async setProductQuantity(id: string, quantity: number) {
    const searchedProduct = await this.prismaService.product.update({
      where: {
        id
      },
      data: {
        quantityAvailable: quantity
      }
    })
    return searchedProduct.quantityAvailable
  }

  async updateProductAmount(id: string, quantity: number) {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        quantityAvailable: {
          decrement: quantity
        }
      }
    })
  }
}
