import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
}
