import { v5 } from 'uuid';

export class EntityIdGenerator {
  private readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  static generate(): EntityIdGenerator {
    return new EntityIdGenerator(v5().split('-').join(''));
  }

  get id(): string {
    return this._id;
  }
}
