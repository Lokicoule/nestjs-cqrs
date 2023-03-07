import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Notification } from '../interfaces/models';
import { NotificationFields, NotificationImpl } from '../models';

type CreateNotificationSettingFields = Pick<
  NotificationFields,
  'id' | 'domain' | 'message' | 'userId' | 'topic'
>;

@Injectable()
export class NotificationFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: CreateNotificationSettingFields): NotificationFields {
    return this.createInDomainContext(fields);
  }

  restore(product: NotificationFields): NotificationFields {
    return this.createInDomainContext(product);
  }

  private createInDomainContext(product: NotificationFields): Notification {
    return this.eventPublisher.mergeObjectContext(
      new NotificationImpl(product),
    );
  }
}
