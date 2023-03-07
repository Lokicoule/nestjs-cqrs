import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common/database';
import { GraphQLModule } from '~/common/graphql';
import { ProductFactory, ProductSettingFactory } from '../domain/factories';
import {
  ProductRepository,
  ProductSettingRepository,
} from '../domain/interfaces/repositories';
import {
  ProductEntity,
  ProductSchema,
  ProductSettingEntity,
  ProductSettingSchema,
} from './entities';
import { RepositoriesProviders } from './repositories';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    GraphQLModule,
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
      {
        name: ProductSettingEntity.name,
        schema: ProductSettingSchema,
      },
    ]),
  ],
  providers: [...RepositoriesProviders, ProductFactory, ProductSettingFactory],
  exports: [
    CqrsModule,
    GraphQLModule,
    ProductRepository,
    ProductSettingRepository,
    ProductFactory,
    ProductSettingFactory,
  ],
})
export class ProductInfrastructureModule {}
