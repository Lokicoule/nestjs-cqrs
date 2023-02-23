import { v4, v5 } from 'uuid';

export class EntityIdGenerator {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  static generate(namespace?: string): EntityIdGenerator {
    if (namespace) {
      return new EntityIdGenerator(v5(namespace, v4()));
    }

    return new EntityIdGenerator(v4().split('-').join(''));
  }

  get id(): string {
    return this._id;
  }
}
