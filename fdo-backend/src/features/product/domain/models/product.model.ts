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
    this.id = fields.id;
    this.code = fields.code;
    this.label = fields.label;
    this.userId = fields.userId;
  }

  applyCreation(): void {
    const event = new ProductCreatedEvent(this);
    this.apply(event);
  }
}
