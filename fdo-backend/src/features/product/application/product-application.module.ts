import { Module } from '@nestjs/common';
import { ProductCodeGenerator } from '../domain/services/product-code-generator';
import { ProductInfrastructureModule } from '../infrastructure';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [ProductInfrastructureModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ProductCodeGenerator,
  ],
})
export class ProductApplicationModule {}
