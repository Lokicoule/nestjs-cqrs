import { Module } from '@nestjs/common';
import { ProductPresentationModule } from './presentation';

@Module({
  imports: [ProductPresentationModule],
})
export class ProductModule {}
