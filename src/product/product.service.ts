import { Injectable } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';
import { QueryType } from './types/product.types';

@Injectable()
export class ProductService {
  constructor(private productsRepo: ProductsRepo) {}

  async getProducts(query: QueryType) {
    return await this.productsRepo.getProducts(query);
  }

  async getProductById(id: string) {
    try {
      return await this.productsRepo.getProductById(id);
    } catch (e) {
      console.log(e)
    }
  }
}
