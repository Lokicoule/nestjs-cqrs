import { AggregateRoot } from '@nestjs/cqrs';

export interface Product extends AggregateRoot {
  readonly id: string;
  readonly userId: string;
  readonly code: string;
  readonly label: string;
  /*   readonly createdAt: Date;
  readonly updatedAt: Date; */
}
