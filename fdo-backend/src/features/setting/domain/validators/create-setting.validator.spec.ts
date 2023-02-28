import { ValidationError } from 'class-validator';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { CreateSettingValidator } from './create-setting.validator';
import { PropertyValidator } from './property.validator';

describe('CreateSettingValidator', () => {
  it('should validate a valid setting', () => {
    let setting = new CreateSettingValidator({
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [PropertyKeyEnum.COUNTER, new PropertyValidator(null, 123)],
      ]),
    }).validate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ValidationError);
  });
});
