import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule, GraphQLModule } from '~/common';
import { ProductApplicationModule } from '../application';
import { ProductResolver } from './resolvers';

@Module({
  imports: [CqrsModule, ProductApplicationModule, GraphQLModule, AuthModule],
  providers: [ProductResolver],
})
export class ProductPortModule {}
