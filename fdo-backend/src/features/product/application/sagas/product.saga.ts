/* import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, Saga, ICommand } from '@nestjs/cqrs';
import { Observable, map, take } from 'rxjs';
import { ProductCodeGeneratedEvent } from '../../domain/events/product-code-generated.event';
import {
  CreateProductCommand,
  GenerateProductCodeCommand,
} from '../commands/impl';

@Injectable()
export class ProductSaga {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @Saga()
  createProduct = (events$: Observable<any>): Observable<ICommand> => {
    return events$.ofType(CreateProductCommand).pipe(
      map((event) => {
        const { code, userId } = event;
        // Check if code is not provided
        if (!code) {
          return new GenerateProductCodeCommand(userId);
        }
        // Otherwise, do nothing
        return null;
      }),
      take(1),
    );
  };

  @Saga()
  generateProductCode = (events$: Observable<any>): Observable<ICommand> => {
    return events$.ofType(ProductCodeGeneratedEvent).pipe(
      map((event) => {
        const { userId, code } = event;
        // Create a new CreateProductCommand with generated code
        return new CreateProductCommand({
          userId,
          code,
          label: 'My product label',
        });
      }),
      take(1),
    );
  };
}
 */
