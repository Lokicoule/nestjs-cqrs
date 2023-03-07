import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { NotificationSentEvent } from '~/features/notification/domain/events';

@EventsHandler(NotificationSentEvent)
export class NotificationSentHandler
  implements IEventHandler<NotificationSentEvent>
{
  private readonly logger = new Logger(NotificationSentHandler.name);

  async handle(event: NotificationSentEvent) {
    this.logger.log(`Notification sent: ${event.notification}`);
  }
}
