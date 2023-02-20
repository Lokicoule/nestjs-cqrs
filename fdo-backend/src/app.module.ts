import { Module } from '@nestjs/common';
import {
  AuthModule,
  CacheModule,
  ConfigModule,
  DatabaseModule,
  GraphQLModule,
} from '~/common';

@Module({
  imports: [
    AuthModule,
    CacheModule,
    ConfigModule,
    DatabaseModule,
    GraphQLModule,
  ],
})
export class AppModule {}
