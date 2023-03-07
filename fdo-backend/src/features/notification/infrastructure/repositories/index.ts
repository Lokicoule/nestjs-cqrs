import { Provider } from '@nestjs/common';
import { NotificationRepositoryImpl } from './notification.repository.impl';
import { NotificationRepository } from '~/features/notification/domain/interfaces/repositories';

export const RepositoriesProviders: Provider[] = [
  {
    provide: NotificationRepository,
    useClass: NotificationRepositoryImpl,
  },
];
