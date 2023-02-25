import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';
import { PropertyValidatorBuilder } from './property.validator.builder';
import { SettingValidator } from './setting.validator';

export class SettingValidatorBuilder {
  private userId: string;
  private settingKey: SettingKeyEnum;
  private properties: Map<PropertyKeyEnum, PropertyValidator>;

  public withUserId(userId: string): SettingValidatorBuilder {
    this.userId = userId;
    return this;
  }

  public withSettingKey(settingKey: SettingKeyEnum): SettingValidatorBuilder {
    this.settingKey = settingKey;
    return this;
  }

  public withProperties(
    properties: Map<PropertyKeyEnum, PropertyValidator>,
  ): SettingValidatorBuilder {
    this.properties = properties;
    return this;
  }

  public withProperty(
    propertyKey: PropertyKeyEnum,
    value: string | number,
  ): SettingValidatorBuilder {
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

  public build(): SettingValidator {
    return new SettingValidator(this.userId, this.settingKey, this.properties);
  }
}
