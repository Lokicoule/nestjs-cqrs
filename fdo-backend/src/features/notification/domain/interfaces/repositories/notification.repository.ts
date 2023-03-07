import { Notification } from '../models';

export abstract class NotificationRepository {
  abstract generateId(namespace?: string): string;
  abstract createNotification(notification: Notification): Promise<void>;
  abstract getNotificationById(id: string): Promise<Notification>;
  abstract removeNotificationById(id: string): Promise<void>;
}
