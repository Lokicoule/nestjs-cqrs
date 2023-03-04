import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Product } from '../interfaces/models';
import { ProductFields, ProductImpl } from '../models';

type CreateProductFields = Pick<
  ProductFields,
  'id' | 'code' | 'label' | 'userId'
>;

@Injectable()
export class ProductFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: CreateProductFields): Product {
    return this.createInDomainContext(fields);
  }

  restore(product: ProductFields): Product {
    return this.createInDomainContext(product);
  }

  private createInDomainContext(product: ProductFields): Product {
    return this.eventPublisher.mergeObjectContext(new ProductImpl(product));
  }
}
