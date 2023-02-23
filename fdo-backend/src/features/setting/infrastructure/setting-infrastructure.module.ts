/* import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common';
import { Product, ProductSchema } from './entities';
import { ProductRepositoryImpl } from './repositories';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class SettingInfrastructureModule {}
 */
