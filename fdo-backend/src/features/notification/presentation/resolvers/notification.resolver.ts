// notification.resolver.ts

import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../dtos/notification.dto';

const NOTIFICATION_CREATED_EVENT = 'notificationCreated';

@Resolver((of) => Notification)
export class NotificationResolver {
  constructor(private pubSub: PubSub) {}

  @Subscription((returns) => Notification, {
    name: NOTIFICATION_CREATED_EVENT,
  })
  notificationCreated() {
    return this.pubSub.asyncIterator(NOTIFICATION_CREATED_EVENT);
  }
}
