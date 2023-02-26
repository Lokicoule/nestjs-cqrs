import { ValidationError } from 'class-validator';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { SettingValidatorBuilder } from './setting.validator.builder';

describe('SettingWithIdValidator', () => {
  it('should validate a valid setting', () => {
    const result = new SettingValidatorBuilder()
      .withId('id')
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .buildWithId()
      .validate();

    expect(result).toBeNull();
  });

  it('should return an error for a missing id', () => {
    const result = new SettingValidatorBuilder()
      .withUserId('userId')
      .withSettingKey(SettingKeyEnum.PRODUCT_CODE_GENERATOR)
      .withProperty(PropertyKeyEnum.PREFIX, 'prefix')
      .withProperty(PropertyKeyEnum.SUFFIX, 'suffix')
      .withProperty(PropertyKeyEnum.COUNTER, 123)
      .buildWithId()
      .validate();

    console.log(result);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });
});
