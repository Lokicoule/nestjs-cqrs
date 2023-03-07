import { Module } from '@nestjs/common';
import { NotificationPresentationModule } from './presentation';

@Module({
  imports: [NotificationPresentationModule],
})
export class NotificationModule {}
