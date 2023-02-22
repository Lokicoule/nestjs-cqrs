import { Product } from '../models';

export class ProductCreatedEvent {
  constructor(public readonly product: Product) {}
}
