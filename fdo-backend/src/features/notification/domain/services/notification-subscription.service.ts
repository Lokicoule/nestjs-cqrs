import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../interfaces/models/notification.model';

@Injectable()
export class NotificationSubscriptionService {
  constructor(private readonly pubSub: PubSub) {}

  publishNotificationCreated(notification: Notification): void {
    this.pubSub.publish('notificationCreated', {
      notificationCreated: {
        id: notification.id,
        domain: notification.domain,
        topic: notification.topic,
        message: notification.message,
        userId: notification.userId,
      },
    });
  }
}
