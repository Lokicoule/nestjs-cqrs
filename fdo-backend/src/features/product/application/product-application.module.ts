import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { ProductDomainModule } from '../domain';
import { ProductInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './command-handlers';
import { EventHandlers } from './event-handlers';
import { QueryHandlers } from './query-handlers';

@Module({
  imports: [CqrsModule, ProductDomainModule, ProductInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class ProductApplicationModule {}
