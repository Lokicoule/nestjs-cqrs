import { Module } from '@nestjs/common';
import { ProductDomainModule } from '../domain';
import { ProductInfrastructureModule } from '../infrastructure';

@Module({
  imports: [ProductDomainModule, ProductInfrastructureModule],
})
export class ProductApplicationModule {}
