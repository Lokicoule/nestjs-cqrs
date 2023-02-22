import { Product } from '../../models/product.model';

export class ProductCreatedEvent {
  constructor(public readonly product: Product) {}
}
