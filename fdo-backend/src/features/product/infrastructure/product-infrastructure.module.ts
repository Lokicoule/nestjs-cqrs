import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common/database';
import {
  ProductRepository,
  ProductValidatorBuilder,
} from '../domain/interfaces';
import { ProductEntity, ProductSchema } from './entities';
import { ProductRepositoryImpl } from './repositories';
import { ProductValidatorBuilderImpl } from './validators/product.validator.builder.impl';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: ProductValidatorBuilder,
      useClass: ProductValidatorBuilderImpl,
    },
  ],
  exports: [ProductRepository, ProductValidatorBuilder],
})
export class ProductInfrastructureModule {}
