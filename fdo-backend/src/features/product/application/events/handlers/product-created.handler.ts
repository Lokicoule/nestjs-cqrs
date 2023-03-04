import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '~/features/product/domain/events';
import { Logger } from '@nestjs/common';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  private readonly logger = new Logger(ProductCreatedHandler.name);

  handle(event: ProductCreatedEvent) {
    this.logger.debug(`Product created with ID ${event.product.id}`);
  }
}
