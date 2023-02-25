import { ICommand } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../../domain/enums';

export class CreateSettingCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly settingKey: SettingKeyEnum,
    public readonly properties: Map<PropertyKeyEnum, any>,
  ) {}
}
