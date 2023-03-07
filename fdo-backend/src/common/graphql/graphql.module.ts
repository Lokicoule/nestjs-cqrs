import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: true,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
  exports: [PubSub],
})
export class GraphQLModule {}
