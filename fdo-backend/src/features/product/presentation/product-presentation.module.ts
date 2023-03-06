import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '~/common/auth';
import { GraphQLModule } from '~/common/graphql';
import { ProductApplicationModule } from '../application';
import { ProductResolver } from './resolvers';

@Module({
  imports: [CqrsModule, ProductApplicationModule, GraphQLModule, AuthModule],
  providers: [ProductResolver],
})
export class ProductPresentationModule {}
