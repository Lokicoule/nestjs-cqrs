import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SettingInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './command-handlers';
import { EventHandlers } from './event-handlers';
import { QueryHandlers } from './query-handlers';

@Module({
  imports: [CqrsModule, SettingInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class SettingApplicationModule {}
