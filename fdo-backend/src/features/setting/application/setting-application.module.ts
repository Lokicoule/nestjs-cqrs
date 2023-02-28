import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SettingInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, SettingInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class SettingApplicationModule {}
