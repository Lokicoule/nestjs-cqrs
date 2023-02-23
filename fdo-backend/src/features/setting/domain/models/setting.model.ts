import { AggregateRoot } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';

export type SettingRequiredFields = Readonly<
  Required<{
    id: string;
    key: SettingKeyEnum;
    properties: Map<PropertyKeyEnum, any>;
    userId: string;
  }>
>;

export type SettingFields = SettingRequiredFields;

export class Setting extends AggregateRoot {
  public readonly id: string;
  public readonly key: SettingKeyEnum;
  public readonly properties: Map<PropertyKeyEnum, any>;
  public readonly userId: string;

  constructor(fields: SettingFields) {
    super();
    this.id = fields.id;
    this.key = fields.key;
    this.properties = fields.properties;
    this.userId = fields.userId;
  }
}
