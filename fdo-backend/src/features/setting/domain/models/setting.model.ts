import { AggregateRoot } from '@nestjs/cqrs';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { Property } from './property.model';

export type SettingRequiredFields = Readonly<
  Required<{
    id: string;
    key: SettingKeyEnum;
    properties: Map<PropertyKeyEnum, Property>;
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

export class Setting extends AggregateRoot {
  public readonly id: string;
  public readonly key: SettingKeyEnum;
  public readonly properties: Map<PropertyKeyEnum, Property>;
  public readonly userId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(fields: SettingFields) {
    super();
    Object.assign(this, fields);
  }
}
