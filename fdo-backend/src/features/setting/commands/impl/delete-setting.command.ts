import { ICommand } from '@nestjs/cqrs';

export class DeleteSettingCommand implements ICommand {
  constructor(public readonly key: string, public readonly userId: string) {}
}
