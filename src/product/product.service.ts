import { Injectable } from '@nestjs/common';
import { ProductsRepo } from 'domain/repos/products.repo';

@Injectable()
export class ProductService {
  constructor(private productsRepo: ProductsRepo) {}

  async getProducts() {
    return await this.productsRepo.getProducts();
  }

  async getProductById(id: string) {
    try {
      return await this.productsRepo.getProductById(id);
    } catch (e) {
      console.log(e)
    }
  }
}
