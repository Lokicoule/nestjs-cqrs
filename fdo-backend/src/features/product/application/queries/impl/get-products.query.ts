import { IQuery } from '@nestjs/cqrs';

export class GetProductsQuery implements IQuery {
  constructor(public readonly userId: string, public readonly ids?: string[]) {}
}
