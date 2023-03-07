import { Notification } from '../interfaces/models';

export class NotificationSentEvent {
  constructor(public readonly notification: Notification) {}
}
