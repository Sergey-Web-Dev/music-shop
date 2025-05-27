import { Injectable } from '@nestjs/common';
import {DbService} from '../db.service';
import {products} from './constants/constants';

@Injectable()
export class ProductsSeederService{
  constructor(private prismaService: DbService) {}

  async seed() {
    const existingProducts = await this.prismaService.product.findMany()

    if (existingProducts.length > 0) {
      console.log('Products already exist, skipping seeding.');
      return;
    }

    for (const product of products) {
      await this.prismaService.product.create({
        data: product,
      });
    }

    console.log('Products seeded successfully.');
  }
}
