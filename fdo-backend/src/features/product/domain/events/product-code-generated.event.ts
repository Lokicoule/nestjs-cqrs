import { IEvent } from '@nestjs/cqrs';
import { Product } from '../interfaces/models';

export class ProductCodeGeneratedEvent implements IEvent {
  constructor(public readonly product: Product) {}
}
