import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SettingDomainModule } from '../domain';
import { SettingInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './command-handlers';
import { EventHandlers } from './event-handlers';
import { QueryHandlers } from './query-handlers';

@Module({
  imports: [CqrsModule, SettingDomainModule, SettingInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class SettingApplicationModule {}
