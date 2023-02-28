import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { SettingFactory } from '~/features/setting/domain/interfaces/factories';
import {
  Setting,
  SettingFields,
  SettingImpl,
} from '~/features/setting/domain/models';

@Injectable()
export class SettingFactoryImpl implements SettingFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: SettingFields): Setting {
    return this.eventPublisher.mergeObjectContext(new SettingImpl(fields));
  }

  restore(setting: Setting): Setting {
    return this.eventPublisher.mergeObjectContext(new SettingImpl(setting));
  }
}
