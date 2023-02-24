import { Module } from '@nestjs/common';
import { ProductApplicationModule } from './application';
import { ProductInfrastructureModule } from './infrastructure';
import { ProductPortModule } from './port';

@Module({
  imports: [
    ProductPortModule,
    ProductApplicationModule,
    ProductInfrastructureModule,
  ],
})
export class ProductModule {}
