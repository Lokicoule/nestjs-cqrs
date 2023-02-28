import { PropertyKeyEnum, SettingKeyEnum } from '../../enums';

export interface Setting {
  readonly id: string;
  readonly key: SettingKeyEnum;
  readonly properties: Map<PropertyKeyEnum, string | number>;
  readonly userId: string;
  incrementCounter(): void;
}
