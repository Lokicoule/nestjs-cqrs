import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities';
import { ProductRepositoryImpl } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductRepositoryImpl],
  exports: [ProductRepositoryImpl],
})
export class ProductInfrastructureModule {}
