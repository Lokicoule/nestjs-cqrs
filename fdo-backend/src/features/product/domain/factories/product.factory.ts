import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Product, ProductFields } from '../models';

@Injectable()
export class ProductFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: ProductFields): Product {
    return this.eventPublisher.mergeObjectContext(new Product(fields));
  }

  restore(product: Product): Product {
    return this.eventPublisher.mergeObjectContext(product);
  }
}
