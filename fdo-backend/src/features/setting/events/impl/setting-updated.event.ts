import { Setting } from '../../models/setting.model';

export class SettingUpdatedEvent {
  constructor(public readonly setting: Setting) {}
}
