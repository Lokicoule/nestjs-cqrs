import { PropertyKeyEnum, SettingKeyEnum } from '../enums';

export interface CreateSettingCommand {
  readonly key: SettingKeyEnum;
  readonly userId: string;
  readonly properties: Map<PropertyKeyEnum, any>;
}
