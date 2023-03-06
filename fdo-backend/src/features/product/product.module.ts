import { Module } from '@nestjs/common';
import { ProductApplicationModule } from './application';
import { ProductInfrastructureModule } from './infrastructure';
import { ProductPresentationModule } from './presentation';

@Module({
  imports: [
    ProductPresentationModule,
    ProductApplicationModule,
    ProductInfrastructureModule,
  ],
})
export class ProductModule {}
