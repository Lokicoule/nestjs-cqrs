import { AggregateRoot } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';

export type SettingRequiredFields = Readonly<
  Required<{
    id: string;
    key: SettingKeyEnum;
    properties: Map<PropertyKeyEnum, string | number>;
    userId: string;
  }>
>;

export type SettingOptionalFields = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type SettingFields = SettingRequiredFields & SettingOptionalFields;

export interface Setting {
  readonly id: string;
  readonly key: SettingKeyEnum;
  readonly properties: Map<PropertyKeyEnum, string | number>;
  readonly userId: string;
  incrementCounter(): void;
}

export class SettingImpl extends AggregateRoot implements Setting {
  public readonly id: string;
  public readonly key: SettingKeyEnum;
  public readonly properties: Map<PropertyKeyEnum, string | number>;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(fields: SettingFields) {
    super();
    Object.assign(this, fields);
  }

  incrementCounter() {
    const counter = this.properties.get(PropertyKeyEnum.COUNTER) || 0;
    this.properties.set(PropertyKeyEnum.COUNTER, Number(counter) + 1);

    //this.apply(new SettingCounterUpdatedEvent(this));
  }
}
