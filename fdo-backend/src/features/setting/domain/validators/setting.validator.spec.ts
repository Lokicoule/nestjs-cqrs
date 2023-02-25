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

  it('should return an error for a missing user id', () => {
    const result = new SettingValidatorBuilder()
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .build()
      .validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return an error for a missing setting key', () => {
    const result = new SettingValidatorBuilder()

      .withUserId('userId')
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .build()
      .validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return an error for a missing property key', () => {
    const result = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(null, 123)
      .build()
      .validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return an error for a missing property value', () => {
    const result = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, null)
      .build()
      .validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });
});
