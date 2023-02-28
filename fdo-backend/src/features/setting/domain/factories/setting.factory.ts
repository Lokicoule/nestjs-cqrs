import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Setting } from '../interfaces/models';
import { SettingFields, SettingImpl } from '../models';

@Injectable()
export class SettingFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: SettingFields): Setting {
    return this.createInDomainContext(new SettingImpl(fields));
  }

  restore(setting: Setting): Setting {
    return this.createInDomainContext(new SettingImpl(setting));
  }

  private createInDomainContext(settingImpl: SettingImpl): Setting {
    return this.eventPublisher.mergeObjectContext(settingImpl);
  }
}
