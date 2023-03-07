import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/interfaces/repositories';
import { CacheService } from '~/common/cache';
import { Notification } from '../../domain/interfaces/models';
import { EntityIdGenerator } from '~/common/database';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly cacheService: CacheService) {}

  generateId(namespace?: string): string {
    return EntityIdGenerator.generate(namespace).id;
  }

  async createNotification(notification: Notification): Promise<void> {
    await this.cacheService.set(notification.id, notification);
  }

  async getNotificationById(id: string): Promise<Notification> {
    return this.cacheService.get(id);
  }

  async removeNotificationById(id: string): Promise<void> {
    await this.cacheService.del(id);
  }
}
