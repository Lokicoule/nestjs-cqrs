import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common';
import { ProductRepository } from '../domain/interfaces';
import { ProductEntity, ProductSchema } from './entities';
import { ProductRepositoryImpl } from './repositories';

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
  ],
  exports: [ProductRepository],
})
export class ProductInfrastructureModule {}
