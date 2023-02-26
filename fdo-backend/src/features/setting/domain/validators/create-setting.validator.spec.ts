import { ValidationError } from 'class-validator';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { CreateSettingValidator } from './create-setting.validator';
import { PropertyValidatorBuilder } from './property.validator.builder';

describe('CreateSettingValidator', () => {
  it('should validate a valid setting', () => {
    let setting = new CreateSettingValidator({
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    });

    expect(setting.validate()).toBeNull();

    setting = new CreateSettingValidator({
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    });

    expect(setting.validate()).toBeNull();
  });

  it('should return an error for a missing user id', () => {
    const result = new CreateSettingValidator({
      userId: null,
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    }).validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return an error for a missing setting key', () => {
    const result = new CreateSettingValidator({
      userId: 'userId',
      key: null,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    }).validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return an error for a missing property key', () => {
    const result = new CreateSettingValidator({
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder().withKey(null).withValue(123).build(),
        ],
      ]),
    }).validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });
});
