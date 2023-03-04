import { ICommand } from '@nestjs/cqrs';

export class GenerateProductCodeCommand implements ICommand {
  constructor(public readonly userId: string, public readonly code?: string) {}
}
