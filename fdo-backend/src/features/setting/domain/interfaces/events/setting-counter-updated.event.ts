import { Setting } from '../../models';

export interface SettingCounterUpdatedEvent {
  readonly setting: Setting;
}
