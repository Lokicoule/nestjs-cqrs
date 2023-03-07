import { Module } from '@nestjs/common';
import { AuthModule } from '~/common/auth';
import { NotificationApplicationModule } from '../application';
import { NotificationResolver } from './resolvers';

@Module({
  imports: [NotificationApplicationModule, AuthModule],
  providers: [NotificationResolver],
})
export class NotificationPresentationModule {}
