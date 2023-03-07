import { AggregateRoot } from '@nestjs/cqrs';
import { Notification } from '../interfaces/models';

export type NotificationRequiredFields = Readonly<
  Required<{
    id: string;
    domain: string;
    topic: string;
    message: string;
    userId: string;
  }>
>;

export type NotificationOptionalFields = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type NotificationFields = NotificationRequiredFields &
  NotificationOptionalFields;

export class NotificationImpl extends AggregateRoot implements Notification {
  public readonly id: string;
  public readonly userId: string;
  public readonly domain: string;
  public readonly topic: string;
  public readonly message: string;
  /*   public readonly createdAt: Date;
  public readonly updatedAt: Date; */

  constructor(fields: NotificationFields) {
    super();
    Object.assign(this, fields);
  }
}
