import { IEvent } from '@nestjs/cqrs';
import { Setting } from '~/features/setting/domain/models';
import { SettingCounterUpdatedEvent as ISettingCounterUpdatedEvent } from '~/features/setting/domain/interfaces/events';

export class SettingCounterUpdatedEvent
  implements ISettingCounterUpdatedEvent, IEvent
{
  constructor(public readonly setting: Setting) {}
}
