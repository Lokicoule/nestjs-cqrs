import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';
import { PropertyValidatorBuilder } from './property.validator.builder';
import { SettingWithIdValidator } from './setting-with-id.validator';
import { ISettingValidator, SettingValidator } from './setting.validator';

export interface ISettingValidatorBuilder {
  withId(id: string): ISettingValidatorBuilder;
  withUserId(userId: string): ISettingValidatorBuilder;
  withSettingKey(settingKey: SettingKeyEnum): ISettingValidatorBuilder;
  withProperties(
    properties: Map<PropertyKeyEnum, string | number>,
  ): ISettingValidatorBuilder;
  withProperty(
    propertyKey: PropertyKeyEnum,
    value: string | number,
  ): ISettingValidatorBuilder;
  build(): ISettingValidator;
  buildWithId(): ISettingValidator;
}

export class SettingValidatorBuilder implements ISettingValidatorBuilder {
  private id: string;
  private userId: string;
  private settingKey: SettingKeyEnum;
  private properties: Map<PropertyKeyEnum, PropertyValidator>;

  public withId(id: string): ISettingValidatorBuilder {
    this.id = id;
    return this;
  }

  public withUserId(userId: string): ISettingValidatorBuilder {
    this.userId = userId;
    return this;
  }

  public withSettingKey(settingKey: SettingKeyEnum): ISettingValidatorBuilder {
    this.settingKey = settingKey;
    return this;
  }

  public withProperties(
    properties: Map<PropertyKeyEnum, string | number>,
  ): ISettingValidatorBuilder {
    if (!this.properties) {
      this.properties = new Map<PropertyKeyEnum, PropertyValidator>();
    }

    for (const [key, value] of properties.entries()) {
      this.properties.set(
        key,
        new PropertyValidatorBuilder().withKey(key).withValue(value).build(),
      );
    }

    return this;
  }

  public withProperty(
    propertyKey: PropertyKeyEnum,
    value: string | number,
  ): ISettingValidatorBuilder {
    if (!this.properties) {
      this.properties = new Map<PropertyKeyEnum, PropertyValidator>();
    }
    this.properties.set(
      propertyKey,
      new PropertyValidatorBuilder()
        .withKey(propertyKey)
        .withValue(value)
        .build(),
    );
    return this;
  }

  public build(): ISettingValidator {
    const settingValidatorProps = {
      userId: this.userId,
      settingKey: this.settingKey,
      properties: this.properties,
    };

    return new SettingValidator(settingValidatorProps);
  }

  public buildWithId(): ISettingValidator {
    const settingValidatorProps = {
      id: this.id,
      userId: this.userId,
      settingKey: this.settingKey,
      properties: this.properties,
    };

    return new SettingWithIdValidator(settingValidatorProps);
  }
}
