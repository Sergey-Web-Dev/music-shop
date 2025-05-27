import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'domain/dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return  this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);
    if(!product) {
      throw new HttpException('There is no such product', HttpStatus.BAD_REQUEST);
    }
    return ProductDto.fromEntity(product);
  }
}
