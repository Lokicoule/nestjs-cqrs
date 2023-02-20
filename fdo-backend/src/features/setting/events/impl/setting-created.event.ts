import { Setting } from '../../models/setting.model';

export class SettingCreatedEvent {
  constructor(public readonly setting: Setting) {}
}
