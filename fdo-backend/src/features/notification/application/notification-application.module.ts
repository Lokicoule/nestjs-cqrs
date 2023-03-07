import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { NotificationInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
/* import { QueryHandlers } from './queries/handlers';
 */
@Module({
  imports: [NotificationInfrastructureModule],
  providers: [
    ...CommandHandlers,
    /*     ...QueryHandlers,
     */ ...EventHandlers,
  ],
  exports: [NotificationInfrastructureModule],
})
export class NotificationApplicationModule {}
