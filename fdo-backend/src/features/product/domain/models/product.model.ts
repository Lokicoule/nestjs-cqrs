import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events/product-created.event';

export type ProductRequiredFields = Readonly<
  Required<{
    label: string;
    userId: string;
  }>
>;

export type ProductOptionalFields = Readonly<
  Partial<{
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type ProductFields = ProductRequiredFields & ProductOptionalFields;

export class Product extends AggregateRoot {
  public readonly id: string;
  public readonly code: string;
  public readonly label: string;
  public readonly userId: string;

  constructor(fields: ProductFields) {
    super();
    Object.assign(this, fields);
  }

  applyCreation(): void {
    const event = new ProductCreatedEvent(this);
    this.apply(event);
  }
}
