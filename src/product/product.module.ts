import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsRepo } from 'domain/repos/products.repo';
import {DbModule} from '../db/db.module';


@Module({
  imports:[DbModule],
  controllers: [ProductController],
  providers: [ProductService, ProductsRepo],
})
export class ProductModule {}
