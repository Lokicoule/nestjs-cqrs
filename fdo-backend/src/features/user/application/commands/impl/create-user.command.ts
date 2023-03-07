import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly providerId: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
