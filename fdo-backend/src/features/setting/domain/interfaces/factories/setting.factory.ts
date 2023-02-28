import { Setting, SettingFields } from '../../models';

export abstract class SettingFactory {
  abstract create(fields: SettingFields): Setting;
  abstract restore(setting: Setting): Setting;
}
