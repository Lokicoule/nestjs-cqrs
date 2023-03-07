import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { NotificationSentEvent } from '~/features/notification/domain/events';
import { NotificationFactory } from '~/features/notification/domain/factories';
import { NotificationRepository } from '~/features/notification/domain/interfaces/repositories';
import { NotificationSubscriptionService } from '~/features/notification/domain/services/notification-subscription.service';
import { SendNotificationCommand } from '../impl/send-notification.command';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
  implements ICommandHandler<SendNotificationCommand>
{
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationFactory: NotificationFactory,
    private readonly pubSub: PubSub,
    private readonly notificationSubscriptionService: NotificationSubscriptionService,
  ) {}

  async execute(command: SendNotificationCommand): Promise<void> {
    const notification = this.notificationFactory.create({
      id: this.notificationRepository.generateId('notification'),
      domain: command.domain,
      message: command.message,
      userId: command.userId,
      topic: command.topic,
    });

    await this.notificationRepository.createNotification(notification);
    this.notificationSubscriptionService.publishNotificationCreated(
      notification,
    );
  }
}
