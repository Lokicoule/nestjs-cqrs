import { ValidationError } from 'class-validator';
import 'reflect-metadata';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { SettingValidatorBuilder } from './setting.validator.builder';

describe('SettingValidator', () => {
  it('should validate a valid setting', () => {
    let setting = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .build();

    expect(setting.validate()).toBeNull();

    setting = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .build();

    expect(setting.validate()).toBeNull();
  });

  it('should throw an error for an invalid setting', () => {
    let setting = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, '123')
      .build();

    expect(setting.validate()).toBeInstanceOf(ValidationError);

    setting = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 123)
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .build();

    expect(setting.validate()).toBeInstanceOf(ValidationError);

    setting = new SettingValidatorBuilder()
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .build();

    expect(setting.validate()).toBeInstanceOf(ValidationError);
  });
});
