import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './command-handlers';
import { EventHandlers } from './event-handlers';
import { QueryHandlers } from './query-handlers';

@Module({
  imports: [CqrsModule, ProductInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class ProductApplicationModule {}
