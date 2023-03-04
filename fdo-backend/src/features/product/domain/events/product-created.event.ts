import { IEvent } from '@nestjs/cqrs';
import { Product } from '../interfaces/models';

export class ProductCreatedEvent implements IEvent {
  constructor(public readonly product: Product) {}
}
