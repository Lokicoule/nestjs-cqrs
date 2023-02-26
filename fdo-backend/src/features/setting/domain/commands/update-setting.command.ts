import { PropertyKeyEnum, SettingKeyEnum } from '../enums';

export interface UpdateSettingCommand {
  readonly id: string;
  readonly key: SettingKeyEnum;
  readonly userId: string;
  readonly properties: Map<PropertyKeyEnum, any>;
}
