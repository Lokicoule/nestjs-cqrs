import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events/product-created.event';

export class Product extends AggregateRoot {
  public readonly id: string;

  public readonly code: string;

  public readonly label: string;

  public readonly userId: string;

  constructor(_label: string, _userId: string, _code: string, _id?: string) {
    super();
    this.code = _code;
    this.label = _label;
    this.userId = _userId;
    this.id = _id;
  }

  async commit(): Promise<void> {
    const event = new ProductCreatedEvent(this);
    this.apply(event);
  }
}
