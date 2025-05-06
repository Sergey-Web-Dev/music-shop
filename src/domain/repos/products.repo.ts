import { Injectable } from '@nestjs/common';
import { QueryType } from 'product/types/product.types';
import {DbService} from '../../db/db.service';

@Injectable()
export class ProductsRepo {
  constructor(private prismaService: DbService) {}

  async getProducts(query: QueryType) {
    const { page, perPage } = query;
    const skip = page ? (page-1) * perPage : 0;
    const take = +perPage;
    return await this.prismaService.product.findMany({
      where: {
        quantityAvailable: { gt: 0 },
      },
      skip,
      take
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
