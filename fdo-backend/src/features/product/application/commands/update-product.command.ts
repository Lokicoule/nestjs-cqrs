import { ICommand } from '@nestjs/cqrs';

export class UpdateProductCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly label: string,
    public readonly code: string,
  ) {}
}
