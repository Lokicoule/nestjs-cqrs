import { ICommand } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../../domain/enums';

export class UpdateSettingCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly key: SettingKeyEnum,
    public readonly userId: string,
    public readonly properties: Map<PropertyKeyEnum, any>,
  ) {}
}
