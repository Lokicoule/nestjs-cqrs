import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly label: string,
    public readonly code?: string,
  ) {}
}
