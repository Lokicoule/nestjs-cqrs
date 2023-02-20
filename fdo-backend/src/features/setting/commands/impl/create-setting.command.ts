import { ICommand } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../../enums';

export class CreateSettingCommand implements ICommand {
  constructor(
    public readonly key: SettingKeyEnum,
    public readonly properties: Map<PropertyKeyEnum, any>,
    public readonly userId: string,
  ) {}
}
