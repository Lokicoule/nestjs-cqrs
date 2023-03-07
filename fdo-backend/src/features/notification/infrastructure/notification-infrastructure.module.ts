import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '~/common/cache';
import { GraphQLModule } from '~/common/graphql';
import { NotificationRepository } from '~/features/notification/domain/interfaces/repositories';
import { NotificationFactory } from '../domain/factories';
import { NotificationSubscriptionService } from '../domain/services/notification-subscription.service';
import { RepositoriesProviders } from './repositories';

@Module({
  imports: [CqrsModule, GraphQLModule, CacheModule],
  providers: [
    ...RepositoriesProviders,
    NotificationFactory,
    NotificationSubscriptionService,
  ],
  exports: [
    CqrsModule,
    GraphQLModule,
    NotificationRepository,
    NotificationFactory,
    NotificationSubscriptionService,
  ],
})
export class NotificationInfrastructureModule {}
