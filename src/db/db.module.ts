import { Module } from '@nestjs/common';
import {DbService} from './db.service';
import {ProductsSeederService} from './seeders/products.seeder.service';

@Module({
  providers: [DbService, ProductsSeederService],
  exports: [DbService, ProductsSeederService],
})
export class DbModule {}