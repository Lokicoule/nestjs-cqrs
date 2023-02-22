import { Module } from '@nestjs/common';
import { ProductApplicationModule } from '../application';

@Module({
  imports: [ProductApplicationModule],
})
export class ProductPresentationModule {}
