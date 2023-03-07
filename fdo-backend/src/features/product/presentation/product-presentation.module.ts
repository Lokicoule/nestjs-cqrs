import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '~/common/auth';
import { ProductApplicationModule } from '../application';
import { ProductResolver } from './resolvers';

@Module({
  imports: [CqrsModule, ProductApplicationModule, AuthModule],
  providers: [ProductResolver],
})
export class ProductPresentationModule {}
