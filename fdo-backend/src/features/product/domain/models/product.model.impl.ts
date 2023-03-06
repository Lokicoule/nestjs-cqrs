import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events';
import { Product } from '../interfaces/models';

export type ProductRequiredFields = Readonly<
  Required<{
    id: string;
    label: string;
    userId: string;
    code: string;
  }>
>;

export type ProductOptionalFields = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type ProductFields = ProductRequiredFields & ProductOptionalFields;

export class ProductImpl extends AggregateRoot implements Product {
  public readonly id: string;
  public readonly userId: string;
  public readonly code: string;
  public readonly label: string;
  /*   public readonly createdAt: Date;
  public readonly updatedAt: Date; */

  constructor(fields: ProductFields) {
    super();
    Object.assign(this, fields);
  }

  addProduct() {
    this.apply(new ProductCreatedEvent(this));
  }
}
