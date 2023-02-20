import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      sortSchema: true,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
})
export class GraphQLModule {}
