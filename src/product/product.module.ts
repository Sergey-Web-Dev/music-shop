import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsRepo } from 'domain/repos/products.repo';


@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductsRepo],
})
export class ProductModule {}
