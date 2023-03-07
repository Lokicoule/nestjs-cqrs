import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '~/features/product/domain/events';
import { Logger } from '@nestjs/common';
import { SendNotificationCommand } from '~/features/notification/application/commands/impl';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  private readonly logger = new Logger(ProductCreatedHandler.name);

  constructor(private readonly commandBus: CommandBus) {}

  handle(event: ProductCreatedEvent) {
    this.logger.debug(`Product created with ID ${event.product.id}`);
    this.commandBus.execute(
      new SendNotificationCommand(
        'product',
        'Product created',
        `Product ${event.product.label} created`,
        event.product.userId,
      ),
    );
  }
}
